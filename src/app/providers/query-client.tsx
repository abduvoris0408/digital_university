import {
	MutationCache,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import type { PropsWithChildren } from 'react'
import type { TError } from '../../types/app'
import { errorMessage } from '../../utils/messages'

const axiosErrorHandler = (error: Error | AxiosError<TError>) => {
	if (axios.isAxiosError(error)) {
		errorMessage(error.message)
	} else {
		errorMessage(error.message)
	}
}

const queryClient = new QueryClient({
	mutationCache: new MutationCache({
		onError: axiosErrorHandler,
	}),
	defaultOptions: {
		queries: {
			gcTime: 30_000,
			staleTime: 1000 * 60,
		},
	},
})

export const Query: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
