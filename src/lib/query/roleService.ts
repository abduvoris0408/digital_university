import type {
	CreateRoleRequest,
	Permission,
	Role,
	UpdateRoleRequest,
} from '../../types/role'
import { api } from '../services/api/axios'

export const roleService = {
	getPermissions: async (search?: string): Promise<Permission[]> => {
		const response = await api.get('/base/perimission-list/', {
			params: search ? { search } : undefined,
		})
		return response.data.data
	},

	createRole: async (data: CreateRoleRequest): Promise<Role> => {
		const response = await api.post('/base/role-create/', data)
		return response.data.data
	},

	getRole: async (guid: string): Promise<Role> => {
		const response = await api.get(`/base/role-retrieve/${guid}/`)
		return response.data.data || response.data
	},

	updateRole: async (
		guid: string,
		data: UpdateRoleRequest
	): Promise<Role> => {
		const response = await api.put(
			`/base/role-retrieve-update/${guid}/`,
			data
		)
		return response.data.data
	},

	getRoles: async (search?: string): Promise<Role[]> => {
		const response = await api.get('/base/role-list/', {
			params: search ? { search } : undefined,
		})
		return response.data.data
	},

	deleteRole: async (guid: string): Promise<void> => {
		await api.delete(`/base/role-destroy/${guid}/`)
	},
}
