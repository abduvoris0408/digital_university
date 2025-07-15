import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { IUser } from '../../types/user'
import { api } from '../services/api'

export const useUsers = () =>
	useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const res = await api.get('/user/list/')
			return res.data
		},
	})

export const useCreateUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: Partial<IUser>) => {
			const res = await api.post('/user/create/', data)
			return res.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
		},
	})
}

export const useUpdateUser = (guid: string) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: Partial<IUser>) => {
			const res = await api.put(`/user/retrieve-update/${guid}/`, data)
			return res.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
		},
	})
}

export const useDeleteUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (guid: string) => {
			await api.delete(`/user/destroy/${guid}/`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
		},
	})
}
