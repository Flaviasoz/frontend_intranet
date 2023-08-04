'use client'

import { AxiosResponse } from 'axios'
import axios from './.instanceAxios'
import {
  GetFavoritMenu,
  GetFavoritMenuResponse,
  GetMenuUser,
  GetMenuUserResponse,
  GetRegisterLogsResponse,
  ProfileInfo,
  ProfileInfoResponse,
  UpdateInfoUser,
  UpdateInfoUserResponse,
} from './.Interfaces'

export const profileInfo = async (
  data: ProfileInfo,
): Promise<AxiosResponse<ProfileInfoResponse>> => {
  const response = await axios.post<ProfileInfoResponse>(
    '/applications/get-profile-info',
    {
      ...data,
    },
  )

  return Promise.resolve(response)
}

export const postFavoritMenu = async (
  data: GetFavoritMenu,
): Promise<AxiosResponse<GetFavoritMenuResponse[]>> => {
  const response = await axios.post<GetFavoritMenuResponse[]>(
    '/applications/post-menus-favorite',
    {
      ...data,
    },
  )

  return Promise.resolve(response)
}

export const getMenuUser = async (
  data: GetMenuUser,
): Promise<AxiosResponse<GetMenuUserResponse>> => {
  const response = await axios.post<GetMenuUserResponse>(
    '/applications/get-menu-user',
    {
      ...data,
    },
  )

  return Promise.resolve(response)
}

export const updateInfoUser = async (
  data: UpdateInfoUser,
): Promise<AxiosResponse<UpdateInfoUserResponse>> => {
  const response = await axios.post<UpdateInfoUserResponse>(
    '/applications/update-email-password',
    {
      ...data,
    },
  )

  return Promise.resolve(response)
}

export const getRegisterLogs = async (): Promise<
  AxiosResponse<GetRegisterLogsResponse[]>
> => {
  const response = await axios.get<GetRegisterLogsResponse[]>(
    '/applications/get-logs-errors',
  )

  return Promise.resolve(response)
}
