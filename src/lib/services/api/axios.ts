import axios, { type AxiosRequestConfig } from 'axios'
import { API_URL } from '../../../constants/common'
import type { IFetchProps } from '../../../types/props'
import {
	errorInterceptor,
	requestInterceptor,
	successInterceptor,
} from './interceptors'

const axiosConfig: AxiosRequestConfig = {
	baseURL: API_URL,
}

const api = axios.create(axiosConfig)

api.interceptors.request.use(requestInterceptor)
api.interceptors.response.use(successInterceptor, errorInterceptor)

const $fetch = <T = undefined>({ lng, path, config }: IFetchProps) =>
	api.get<T>(path, {
		headers: lng
			? {
					'Accept-Language': lng,
			  }
			: undefined,
		...config,
	})

export { $fetch, api }
