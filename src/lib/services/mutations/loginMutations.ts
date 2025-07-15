import { useMutation } from '@tanstack/react-query'
import { ENDPOINTS } from '../../../constants/endpoints'
import { useAuthStore } from '../../../store'
import type { TLogin, TLoginResponse } from '../../../types/auth'
import type { IUser } from '../../../types/user'
import { history } from '../../../utils/history'
import { successMessage } from '../../../utils/messages'
import { api } from '../api'

export const useLogin = () => {
	const { setToken, setUser } = useAuthStore()

	return useMutation({
		mutationFn: async (event: TLogin) => {
			const { data } = await api.post<TLoginResponse>(
				ENDPOINTS.login,
				event
			)
			return data
		},
		onSuccess: async response => {
			const accessToken = response.data.access
			const refreshToken = response.data.refresh

			if (accessToken && refreshToken) {
				setToken({ accessToken, refreshToken })

				try {
					const { data: meData } = await api.get<{
						status_code: number
						data: IUser[]
					}>('/base/me/')
					if (meData.status_code === 200 && meData.data.length > 0) {
						setUser(meData.data[0])
						console.log('✅ User storega saqlandi:', meData.data[0])
					}
				} catch (error) {
					console.error('Foydalanuvchini olishda xatolik:', error)
				}

				successMessage('You are login successfully')
				history.push('/dashboard')
			}
		},
	})
}
