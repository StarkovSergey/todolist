import { instance, LoginParamsType, ResponseType } from './todolist-api'

export const authAPI = {
  login(loginParams: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>(`auth/login`, loginParams)
  },
  me() {
    return instance.get<ResponseType<meResponseType>>(`auth/me`)
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`)
  },
}

export type meResponseType = {
  id: number
  email: string
  login: string
}
