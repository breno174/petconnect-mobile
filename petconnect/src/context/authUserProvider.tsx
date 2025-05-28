import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { api } from "../api/axios";
import { LoginProps, UserData } from "../interfaces/userInterface";
import { RegisterProps } from "../interfaces/userRegisterInterface";
import { getToken, removeToken, setToken } from "../services/tokenService";
import axios, { AxiosResponse } from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  isAuthenticated: boolean;
  login: (data: LoginProps) => Promise<AxiosResponse<any, { token: string }>>;
  registerUser: (data: RegisterProps) => Promise<AxiosResponse<any, any>>;
  logout: () => void;
  currentUser: () => Promise<UserData>;
}

// as => garantindo o tipo;

export const AuthUserContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthUserProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
  let mounted = true;
  const fetchToken = async () => {
    const token = await getToken();
    if (mounted) setAuthToken(token);
  };
  fetchToken();
  return () => {
    mounted = false;
  };
}, []);

  const login = async (data: LoginProps) => {
    const response = await api.post<{ token: string }>("/auth/login", data);
    await setToken(response.data.token);
    setAuthToken(response.data.token);
    return response;
  };

  const currentUser = async (): Promise<UserData> => {
    try {
      const response = await api.get("/user/bytoken", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          // Você pode redirecionar para login ou limpar o token aqui
          throw new Error("Acesso negado. Por favor faça login novamente.");
        }
      }
      // Rejeita outros erros
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  const registerUser = async (data: RegisterProps) => {
    return api.post("/user", data);
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthUserContext.Provider
      value={{ isAuthenticated, login, registerUser, logout, currentUser }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => useContext(AuthUserContext);
