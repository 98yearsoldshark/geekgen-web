import alova from "../index.ts";
import {AuthInfo, UserSignUpData} from "../types/auth.types.ts";

export const login =
  (username: string, password: string) =>
    alova.Post<AuthInfo>('/user/login', {
      username: username,
      password: password
    })

export const signup =
  (data: UserSignUpData) =>
    alova.Post<AuthInfo>('/user/signup', data)

export const checkLogin =
  () => alova.Get<null>('/user/check_login')