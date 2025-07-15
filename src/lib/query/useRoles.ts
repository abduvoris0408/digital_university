import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import type { CreateRoleRequest, UpdateRoleRequest } from '../../types/role'
import { roleService } from '../query/roleService'

export const usePermissions = (search?: string) => {
	return useQuery({
		queryKey: ['permissions', search],
		queryFn: () => roleService.getPermissions(search),
		staleTime: 5 * 60 * 1000,
		enabled: true,
	})
}

export const useRoles = (search?: string) => {
	return useQuery({
		queryKey: ['roles', search],
		queryFn: () => roleService.getRoles(search),
		staleTime: 2 * 60 * 1000,
	})
}

export const useRole = (guid: string) => {
	return useQuery({
		queryKey: ['role', guid],
		queryFn: () => roleService.getRole(guid),
		enabled: !!guid,
	})
}

export const useCreateRole = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateRoleRequest) => roleService.createRole(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['roles'] })
			message.success('Rol muvaffaqiyatli yaratildi!')
		},
		onError: (error: any) => {
			message.error(
				error.response?.data?.message ||
					'Rol yaratishda xatolik yuz berdi!'
			)
		},
	})
}

export const useUpdateRole = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			guid,
			data,
		}: {
			guid: string
			data: UpdateRoleRequest
		}) => roleService.updateRole(guid, data),
		onSuccess: (_, { guid }) => {
			queryClient.invalidateQueries({ queryKey: ['roles'] })
			queryClient.invalidateQueries({ queryKey: ['role', guid] })
			message.success('Rol muvaffaqiyatli yangilandi!')
		},
		onError: (error: any) => {
			message.error(
				error.response?.data?.message ||
					'Rol yangilashda xatolik yuz berdi!'
			)
		},
	})
}

export const useDeleteRole = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (guid: string) => roleService.deleteRole(guid),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['roles'] })
			message.success("Rol muvaffaqiyatli o'chirildi!")
		},
		onError: (error: any) => {
			message.error(
				error.response?.data?.message ||
					"Rol o'chirishda xatolik yuz berdi!"
			)
		},
	})
}
