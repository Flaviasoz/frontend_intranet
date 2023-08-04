'use client'

import React, { useEffect, useState } from 'react'
import logo from '@/assets/logos/logo_branco.svg'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import {
  Visibility,
  VisibilityOff,
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
  ArrowBack,
} from '@mui/icons-material'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
// import ModalGlobal from '@/pages/components/GlobalModal'
import { logar, logarURL } from '@/services/auth'
import { sxLogin } from '@/styles/sx'
import { useMutation, useQuery } from 'react-query'
// import CustomLoaders from '@/pages/components/Loader'
import { Login } from '@/services/.Interfaces'
import Image from 'next/image'
import { TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import setUser from '@/app/cookies/auth'
import { encrypt } from '@/functions'

export default function Acessar({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [codUsuario, setCodUsuario] = useState('')
  const [senhaUsuario, setSenhaUsuario] = useState('')
  const [isModalOpen, setModal] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false)
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
      setUser(encrypt(JSON.stringify(r.data)))
      router.push('/')
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

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  return (
    <div className="text-center flex justify-center flex-col bg-primaryColor h-screen w-full overflow-hidden ">
      {/* <CustomLoaders
				open={loginURL.isLoading || login.isLoading}
				animation={'loadingWhite'}
			/> */}

      {!loginURL.isLoading && !login.isLoading && (
        <>
          <div className="w-full flex items-center flex-row pt-8">
            <div className="w-1/4 items-center flex justify-end">
              <div
                className="text-white items-center flex-row flex text-base justify-center cursor-pointer"
                onClick={() => router.push('/')}
              >
                <ArrowBack />
                <span className="ml-0 mr-5 md:ml-3">Voltar</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-1/2">
              <Image alt="Logo Grazziotin" src={logo} width={200} height={40} />
            </div>
          </div>
          <div className=" items-center flex flex-col h-5/6 pt-16">
            <h1 className="text-white font-medium text-4xl pt-12 pb-6">
              Acessar
            </h1>
            <TextField
              id="standard-basic"
              label="Usuário"
              sx={sxLogin}
              variant="standard"
              value={codUsuario}
              onChange={(e) => setCodUsuario(e.target.value)}
              type="number"
              className="w-3/4 md:w-1/5"
            />
            <FormControl
              className="w-3/4 md:w-1/5"
              sx={sxLogin}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Senha
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={senhaUsuario}
                onChange={(e) => setSenhaUsuario(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityOff className="text-white" />
                      ) : (
                        <Visibility className="text-white" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleCheckboxChange}
                className="text-white mt-10"
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
              className="bg-white rounded-full text-slate-800 font-semibold h-14 mt-12 w-3/6 md:w-1/6 hover:shadow-md"
              onClick={() => Logar()}
            >
              ENTRAR
            </button>

            <button
              // onClick={() => navigate('/usuario/esqueciSenha')}
              type="button"
              className="btn pt-8 bg-transparent bg-no-repeat border-none cursor-pointer overflow-hidden text-white outline-none hover:text-shadow-green"
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
								alignItems: 'center'
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
									borderTop: '2px solid #e2e8f2'
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
										margin: '2.5% 5% 0 0'
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
