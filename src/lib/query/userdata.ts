import { useQuery } from '@tanstack/react-query'
import type { AxiosRequestConfig } from 'axios'
import type { IUser } from '../../types/user'
import { api } from '../services/api'

interface UseGetOneDataProps {
	queryKey: string[] | string
	url?: string
	useGuidFromMe?: boolean
	enabled?: boolean
	params?: Record<string, any>
	config?: AxiosRequestConfig
}

interface ApiResponse<T> {
	status_code: number
	data: T
}

export const useGetOneData = <T = any>({
	queryKey,
	url,
	useGuidFromMe = false,
	enabled = true,
	params,
	config = {},
}: UseGetOneDataProps) => {
	const queryKeyArray = Array.isArray(queryKey) ? queryKey : [queryKey]

	return useQuery({
		queryKey: queryKeyArray,
		enabled,
		queryFn: async (): Promise<T> => {
			let finalUrl = url

			if (useGuidFromMe) {
				const meRes = await api.get<ApiResponse<IUser[]>>('/base/me/')
				if (meRes.data.status_code !== 200 || !meRes.data.data.length) {
					throw new Error('Foydalanuvchi topilmadi')
				}
				const guid = meRes.data.data[0].guid
				finalUrl = `/user/retrieve/${guid}/`
			}

			if (!finalUrl) throw new Error('URL aniqlanmagan')

			const res = await api.get<ApiResponse<T>>(finalUrl, {
				params,
				...config,
			})

			if (res.data.status_code !== 200) {
				throw new Error(`API xatosi: ${res.data.status_code}`)
			}

			return res.data.data
		},
	})
}
