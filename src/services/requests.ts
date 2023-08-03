'use server'

import { AxiosResponse } from 'axios'
import axios from './.instanceAxios'
import {
  GetPendingRequest,
  GetSeparations,
  GetSeparationsResponse,
  GetStatusResponse,
} from './.Interfaces'

export const getStatus = async (): Promise<
  AxiosResponse<GetStatusResponse[]>
> => {
  const response = await axios.get<GetStatusResponse[]>('/requests/get-status')

  return Promise.resolve(response)
}

export const getSeparations = async (
  data: GetSeparations,
): Promise<AxiosResponse<GetSeparationsResponse[]>> => {
  const response = await axios.post<GetSeparationsResponse[]>(
    '/requests/get-requests',
    { ...data },
  )

  return Promise.resolve(response)
}

export const getPendingRequest = async (): Promise<
  AxiosResponse<GetPendingRequest[]>
> => {
  const response = await axios.get<GetPendingRequest[]>(
    '/requests/get-request-pending',
  )

  return Promise.resolve(response)
}
