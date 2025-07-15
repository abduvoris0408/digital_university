// src/services/hooks/useCertificates.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ENDPOINTS } from '../../constants/endpoints'
import type { Certificate } from '../../types/certificate'
import { api } from '../services/api'

export const useGetCertificates = () =>
	useQuery<Certificate[]>({
		queryKey: ['certificates'],
		queryFn: () =>
			api.get(ENDPOINTS.certificates.list).then(res => res.data),
	})

export const useCreateCertificate = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (body: Partial<Certificate>) =>
			api.post(ENDPOINTS.certificates.create, body),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['certificates'] }),
	})
}

export const useUpdateCertificate = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({
			guid,
			body,
		}: {
			guid: string
			body: Partial<Certificate>
		}) => api.put(`${ENDPOINTS.certificates.update}/${guid}/`, body),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['certificates'] }),
	})
}

export const useDeleteCertificate = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (guid: string) =>
			api.delete(`${ENDPOINTS.certificates.delete}/${guid}/`),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['certificates'] }),
	})
}
