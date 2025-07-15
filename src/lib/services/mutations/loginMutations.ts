import { useMutation } from '@tanstack/react-query'
import { ENDPOINTS } from '../../../constants/endpoints'
import { useAuthStore } from '../../../store'
import type { TLogin, TLoginResponse } from '../../../types/auth'
import { history } from '../../../utils/history'
import { successMessage } from '../../../utils/messages'
import { api } from '../api'

export const useLogin = () => {
	const { setToken } = useAuthStore()

	return useMutation({
		mutationFn: async (event: TLogin) => {
			const { data } = await api.post<TLoginResponse>(
				ENDPOINTS.login,
				event
			)
			return data
		},
		onSuccess: response => {
			const accessToken = response.data.access
			const refreshToken = response.data.refresh

			if (accessToken && refreshToken) {
				setToken({ accessToken, refreshToken })
				successMessage('You are login successfully')
				history.push('/dashboard')
			}
		},
	})
}
