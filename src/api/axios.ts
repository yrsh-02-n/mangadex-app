import axios, { CreateAxiosDefaults } from 'axios'

import { API_URL } from '@/constants/constants'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	withCredentials: true
}

export const defaultAxios = axios.create(options)
