export interface UserSignUpData {
  username: string;
  password: string;
  level: string;
  role: string;
  school: string;
}

export interface AuthInfo {
  token: string;
  role: number;
}