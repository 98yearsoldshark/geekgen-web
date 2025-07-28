export interface UserSignUpData {
  username: string;
  password: string;
  level: number;
  role: number;
  school: string;
}

export interface AuthInfo {
  token: string;
  role: number;
}