'use server'
import { cookies } from 'next/headers'

export default async function setUser(data: string) {
  cookies().set('LOGIN_INFO', data)
}
