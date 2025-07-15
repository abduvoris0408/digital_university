import type { AxiosRequestConfig } from 'axios'

export interface IFetchProps {
	path: string
	lng?: string
	config?: AxiosRequestConfig
}
