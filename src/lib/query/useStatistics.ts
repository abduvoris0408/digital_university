import { useQuery } from '@tanstack/react-query'
import { ENDPOINTS } from '../../constants/endpoints'
import { api } from '../services/api'

export const useGetStatistics = () =>
	useQuery({
		queryKey: ['statistics'],
		queryFn: async () => {
			const { data } = await api.get(ENDPOINTS.statistics)
			return data?.data
		},
	})
