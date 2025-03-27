import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { api } from "../api/axios";
import { LoginProps, UserData } from "../interfaces/userInterface";
import { RegisterProps } from "../interfaces/userRegisterInterface";
import { getToken, removeToken, setToken } from "../services/tokenService";
import { AxiosResponse } from "axios";

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
      const fetchToken = async () => {
        const token = await getToken();
        setAuthToken(token);
      };
  
      fetchToken();
    }, []);

  const login = async (data: LoginProps) => {
    const response = await api.post<{ token: string }>("/auth/login", data);
    await setToken(response.data.token);
    return response;
  };

  const currentUser = async (): Promise<UserData> => {
    const response = await api.get("/user/bytoken", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  const registerUser = async (data: RegisterProps) => {
    return api.post("/user ", data);
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthUserContext.Provider
      value={{ isAuthenticated, login, registerUser, logout, currentUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => useContext(AuthUserContext);
