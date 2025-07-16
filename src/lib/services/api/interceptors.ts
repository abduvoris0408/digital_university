import axios, {
	AxiosError,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from 'axios'
import { API_URL } from '../../../constants/common'
import { initializeAuthStore } from '../../../store'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/general'
import { errorMessage } from '../../../utils/messages'
import { getLocalStorage, setLocalStorage } from '../../utils/storage'

const refreshTokenRequest = async () => {
	const refreshToken = getLocalStorage(REFRESH_TOKEN)

	if (!refreshToken) {
		throw new Error('Refresh token mavjud emas')
	}

	const response = await axios.post(`${API_URL}/base/token-refresh/`, {
		refresh: refreshToken,
	})

	const newAccessToken = response.data.access
	const newRefreshToken = response.data.refresh

	setLocalStorage(ACCESS_TOKEN, newAccessToken)
	setLocalStorage(REFRESH_TOKEN, newRefreshToken)

	return newAccessToken
}

export const requestInterceptor = (
	config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
	const token = getLocalStorage(ACCESS_TOKEN)

	if (token) {
		config.headers.set('Authorization', `Bearer ${token}`)
	}

	return config
}

export const successInterceptor = (
	response: AxiosResponse
): Promise<AxiosResponse> => {
	return Promise.resolve(response)
}

export const errorInterceptor = async (error: AxiosError): Promise<never> => {
	const { logout } = initializeAuthStore()

	if (error.response?.status === 401) {
		try {
			const newAccessToken = await refreshTokenRequest()

			const originalRequest = error.config
			if (originalRequest) {
				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${newAccessToken}`,
				}
				return axios(originalRequest)
			}
		} catch (refreshError) {
			if (
				refreshError instanceof AxiosError &&
				refreshError.response?.status === 401
			) {
				errorMessage('Sessiya yakunlandi. Qayta tizimga kiring.')
				logout()
			} else {
				errorMessage('Tokenni yangilashda xatolik.')
			}
		}
	} else {
		const errorText =
			error.response?.data?.message ||
			error.response?.statusText ||
			'Noma’lum xatolik yuz berdi'

		errorMessage(errorText)
	}

	return Promise.reject(error?.response?.data || error)
}
