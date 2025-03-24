export interface LoginProps {
    email: string;
    password: string;
    name: string;
  }
  
export interface UserData {
    id: number;
    name: string;
    email: string;
    phone: string;
    cpf: null | string;
    password_hash: string;
    enabled: boolean;
    username: string;
    authorities: string[];
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    password: string;
}
  