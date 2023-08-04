'use client'

import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { decrypt } from '@/functions';

const info = Cookies.get('LOGIN_INFO');

const infodec = info ? decrypt(info) : '';
const token = info ? `Bearer ${JSON.parse(infodec).accessToken}` : '';
const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_HOSTNAME_API,
	headers: {
		'Content-Type': 'application/json',
		authorization: token
	},
	timeout: 30000
});

let urls = [
	'/applications/get-menu-user-table',
	'/applications/get-menus',
	'/applications/create-menu',
	'/applications/get-papeis',
	'/applications/get-client-info',
	'/applications/get-valid-campaign',
	'/requests/get-requests',
	'/documents/file/get-clients-files',
	'/applications/get-campaigns',
	'/applications/get-logs-errors'
];

instance.interceptors.response.use(
	(response) => {
		return Promise.resolve(response);
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			if (
				error.response.request.responseURL.endsWith(
					'/applications/get-menu-user'
				)
			) {
				toast.error('Não autorizado!', {
					position: 'top-center'
				});
			} else {
				console.log(error.response.data);
			}
		} else if (error.response && error.response.status === 0) {
			toast.warn('Sem acesso à internet!', {
				position: 'top-center'
			});
		} else {
			if (
				error.response.config.url ===
				urls.find((i) => i === error.response.config.url)
			) {
				toast.error('Ocorreu um erro inesperado, tente novamente mais tarde!', {
					position: 'top-center'
				});
				console.warn(error.response.data);
			} else {
				console.warn(error.response.data);
			}
		}
		return Promise.reject(error);
	}
);

export default instance;
