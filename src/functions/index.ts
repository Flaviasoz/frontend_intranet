'use client'

import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'

export function formatCoin(value: any) {
  return value?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatarNumero(valor: string) {
  return valor?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function formatData(data: string) {
  const dataformata = data
    ?.toString()
    ?.substring(0, 10)
    ?.split('-')
    ?.reverse()
    ?.join('/')

  return dataformata
}

export function Data(data: string) {
  const dta = data?.toString()?.substring(0, 10)?.split('-')?.join('/')

  return dta
}

export function compare(value: any, a: any, b: any) {
  const aValue =
    typeof a[value] === 'string' ? a[value].replace(/[^\d]/g, '') : a[value]
  const bValue =
    typeof b[value] === 'string' ? b[value].replace(/[^\d]/g, '') : b[value]

  return parseFloat(bValue) - parseFloat(aValue)
}

export function useMobile(h: number) {
  'use client'
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= h) {
        setMobile(true)
      } else {
        setMobile(false)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [h]) // Adicionando "mobile" como dependência

  return mobile
}

export const encrypt = (content: any) => {
  const encryptedToken = CryptoJS.AES.encrypt(
    content,
    process.env?.REACT_APP_SECRET_CLIENT ?? '',
  ).toString()

  return encryptedToken
}

export const decrypt = (encryptedContent: any) => {
  const decryptedTokenBytes = CryptoJS.AES.decrypt(
    encryptedContent,
    process.env?.REACT_APP_SECRET_CLIENT ?? '',
  )
  const decryptedToken = decryptedTokenBytes.toString(CryptoJS.enc.Utf8)

  return decryptedToken
}

const info = Cookies.get('LOGIN_INFO')
const infodec = info ? decrypt(info) : ''

export const getToken = () => {
  const response = info ? JSON.parse(infodec).accessToken : ''

  return response
}

export const getUser = () => {
  const response = info ? JSON.parse(infodec).userCode : ''

  return response
}

export const getAccessGroup = () => {
  const response = info ? JSON.parse(infodec).accessGroup : ''

  return parseInt(response)
}

export const getEmail = () => {
  const response = info ? JSON.parse(infodec).email : ''

  return response
}

export const getName = () => {
  const response = info ? JSON.parse(infodec).name : ''

  return response
}

export const getPapeis = () => {
  const papeisGet = Cookies.get('papeis')
  const papeis = papeisGet ? decrypt(papeisGet) : ''
  const response = papeisGet ? JSON.parse(papeis) : ''

  return response
}

const options: any = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
}

const formatadorDataHora = new Intl.DateTimeFormat('pt-BR', options)

export const formatDataHora = (date: Date | string) => {
  return formatadorDataHora.format(new Date(date))
}
