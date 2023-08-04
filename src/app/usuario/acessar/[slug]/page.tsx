'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.scss'
import logo from '@/assets/logos/logo_branco.svg'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import {
  Visibility,
  VisibilityOff,
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
} from '@mui/icons-material'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
// import ModalGlobal from '@/pages/components/GlobalModal'
import { logar, logarURL } from '@/services/auth'
import { sxLogin } from '@/styles/sx'
import Cookies from 'js-cookie'
import { encrypt } from '@/functions'
import { useMutation, useQuery } from 'react-query'
// import CustomLoaders from '@/pages/components/Loader'
// import { useRouter } from 'next/router'
import { Login } from '@/services/.Interfaces'

export default function Acessar({ params }: { params: { slug: string } }) {
  console.log(params)

  // const router = useRouter()
  const [codUsuario, setCodUsuario] = useState('')
  const [senhaUsuario, setSenhaUsuario] = useState('')
  const [isModalOpen, setModal] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  // querys
  const loginURL = useQuery(
    'loginURL',
    () => logarURL({ token: params.slug }),
    {
      enabled: params.slug !== '-',
      onSuccess: (r) => {
        Logar(r.data.COD_USUARIO, r.data.DES_SENHA)
        setCodUsuario(r.data.COD_USUARIO)
      },
    },
  )
  const login = useMutation((data: Login) => logar(data), {
    mutationKey: 'login',
    onSuccess: (r) => {
      Cookies.set('LOGIN_INFO', encrypt(JSON.stringify({ ...r.data })), {
        expires: 7,
        sameSite: 'strict',
        priority: 'high',
        httpOnly: false,
        secure: false,
      })
      // router.push('/')
    },
    onError: (e: any) => {
      setMessage(e?.response?.data?.errors[0][0].details)
      setModal(!isModalOpen)
    },
  })

  useEffect(() => {
    localStorage.setItem('isChecked', checked.toString())
  }, [checked])

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          const btn: any = document.querySelector('#submit')
          btn?.click()
        }
      })
    }, 500)
  }, [])

  function handleCheckboxChange() {
    setChecked(!checked)
  }

  async function Logar(cod?: string, pass?: string) {
    login.mutateAsync({
      username: cod ? String(cod) : codUsuario,
      password: pass || senhaUsuario,
    })
  }

  return (
    <div className="bg-primaryColor min-h-screen flex items-center justify-center font-Montserrat flex-col">
      {/* <CustomLoaders
        open={loginURL.isLoading || login.isLoading}
        animation={'loadingWhite'}
      /> */}

      {!loginURL.isLoading && !login.isLoading && (
        <>
          <div className="w-full flex items-center">
            <div className="w-20">
              <div
                className="text-white flex items-center"
                // onClick={() => router.back()}
              >
                <i className="material-icons scale-80% text-decoration-none hover:cursor-pointer">
                  arrow_back
                </i>
                <span>Voltar</span>
              </div>
            </div>
            <div className="w-60 flex items-center justify-center">
              <img alt="Logo Grazziotin" src={logo} />
            </div>
          </div>
          <div className="h-full flex flex-col items-center pt-14 w-full">
            <h1 className="p-4 text-white">Acessar</h1>
            <FormControl sx={sxLogin} variant="standard" className="w-1/4">
              <InputLabel htmlFor="standard-adornment-password">
                Usuário
              </InputLabel>
              <Input
                id="userCode"
                autoComplete="off"
                value={codUsuario}
                onChange={(e) => setCodUsuario(e.target.value)}
              />
            </FormControl>
            <FormControl sx={sxLogin} variant="standard" className="w-1/4">
              <InputLabel htmlFor="standard-adornment-password">
                Senha
              </InputLabel>
              <Input
                id="passWord"
                type={showPassword ? 'text' : 'password'}
                value={senhaUsuario}
                onChange={(e) => setSenhaUsuario(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      style={{ color: 'white' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleCheckboxChange}
                className="text-white mt-5"
                size="small"
              >
                {checked ? (
                  <CheckBoxRounded />
                ) : (
                  <CheckBoxOutlineBlankRounded />
                )}
                <span> Mantenha-me conectado</span>
              </IconButton>
            </InputAdornment>

            <button
              id="submit"
              type="submit"
              className="w-1/4 h-full m-10 bg-white rounded-3xl border-none text-slate-600 font-bold outline-none hover:cursor-pointer shadow"
              onClick={() => Logar()}
            >
              ENTRAR
            </button>

            <button
              // onClick={() => router.push('/usuario/esqueciSenha')}
              type="button"
              className="text-white hover:cursor-pointer"
            >
              <span>Esqueci a senha</span>
            </button>
          </div>
          {/* <ModalGlobal
            closeModal={setModal}
            title={'Aviso'}
            larg="20%"
            altura="1vh"
            open={isModalOpen}
            bFooter="20px"
          >
            <div
              style={{
                height: 'calc(100% - 35px)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <p>{message}</p>
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  borderTop: '2px solid #e2e8f2',
                }}
              >
                <button
                  onClick={() => setModal(!isModalOpen)}
                  style={{
                    background: '#00b2a6',
                    color: 'white',
                    borderRadius: '5px',
                    height: '30px',
                    width: '100px',
                    margin: '2.5% 5% 0 0',
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </ModalGlobal> */}
        </>
      )}
    </div>
  )
}
