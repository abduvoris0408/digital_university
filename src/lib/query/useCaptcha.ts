import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'

export const useCaptcha = (enabled: boolean) =>
	useQuery({
		queryKey: ['captcha'],
		queryFn: async () => {
			const { data } = await api.get('/base/captcha/')
			return data.data.captcha
		},
		enabled,
	})
