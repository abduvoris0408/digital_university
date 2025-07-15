import type { ApiResponse, IUser, UpdateUserRequest } from '../../types/user'
import { api } from '../services/api/axios'

export const userService = {
	getProfile: async (): Promise<IUser> => {
		const response = await api.get<ApiResponse<IUser>>('/base/me/')
		if (response.data.status_code !== 200) {
			throw new Error(`API xatosi: ${response.data.status_code}`)
		}
		return response.data.data
	},

	updateProfile: async (
		guid: string,
		data: UpdateUserRequest
	): Promise<IUser> => {
		const response = await api.put<ApiResponse<IUser>>(
			`/user/retrieve-update/${guid}/`,
			data
		)
		if (response.data.status_code !== 200) {
			throw new Error(`API xatosi: ${response.data.status_code}`)
		}
		return response.data.data
	},
}
