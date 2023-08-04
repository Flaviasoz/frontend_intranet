'use client'

import { AxiosResponse } from 'axios'
import { Login, LoginResponse, LoginURL, ResponseLoginURL } from './.Interfaces'
import axios from './.instanceAxios'

export const logar = async (
  data: Login,
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axios.post<LoginResponse>('/auth/login', {
    ...data,
    clientId: parseInt(process.env.NEXT_PUBLIC_ID_CLIENT as string),
    clientSecret: process.env.NEXT_PUBLIC_SECRET_CLIENT,
  })

  return Promise.resolve(response)
}

export const logarURL = async (
  data: LoginURL,
): Promise<AxiosResponse<ResponseLoginURL>> => {
  const response = await axios.post<ResponseLoginURL>(
    '/auth/login-ger-user',
    {
      ...data,
    },
    { headers: { 'secret-user-login': 'asdas1d5a4s5dasd1ad4aw5dvsd2asgv1' } },
  )

  return Promise.resolve(response)
}
