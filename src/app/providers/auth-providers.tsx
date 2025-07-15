import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../store'

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const { isHydrated, setHydrated, setIsAuth, setIsInitiated } =
		useAuthStore()

	useEffect(() => {
		const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
			const state = useAuthStore.getState()
			console.log('Hydration finished, current state:', state)

			if (!state.isHydrated) {
				setHydrated()
			}

			// Auth holatini yangilash
			setIsAuth(!!state.accessToken)
			setIsInitiated(true)
			setIsLoading(false)
		})

		// Agar hydration juda uzoq davom etsa, timeout qo'yish
		const timeout = setTimeout(() => {
			console.log('Hydration timeout, forcing initialization')
			setHydrated()
			setIsInitiated(true)
			setIsLoading(false)
		}, 1000)

		return () => {
			unsubscribe()
			clearTimeout(timeout)
		}
	}, [setHydrated, setIsAuth, setIsInitiated])

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
			</div>
		)
	}

	return <>{children}</>
}
