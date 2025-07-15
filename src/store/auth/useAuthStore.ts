import { create } from 'zustand'
import type { IUser } from '../../types/user'

type AuthState = {
	accessToken: string | null
	refreshToken: string | null
	isAuth: boolean
	isInitiated: boolean
	setTokens: (access: string, refresh: string) => void
	clearTokens: () => void
	setIsAuth: (auth: boolean) => void
	setIsInitiated: (init: boolean) => void
	logout: () => void
	setUser: (user: IUser) => void
}

export const useAuthStore = create<AuthState>()(set => ({
	accessToken: localStorage.getItem('accessToken'),
	refreshToken: localStorage.getItem('refreshToken'),
	isAuth: false,
	isInitiated: false,

	setTokens: (access, refresh) => {
		localStorage.setItem('accessToken', access)
		localStorage.setItem('refreshToken', refresh)
		set({
			accessToken: access,
			refreshToken: refresh,
			isAuth: true,
		})
	},

	clearTokens: () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		set({
			accessToken: null,
			refreshToken: null,
		})
	},
	setUser: user => set({ user }),

	setIsAuth: isAuth => set({ isAuth }),
	setIsInitiated: isInitiated => set({ isInitiated }),

	logout: () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		set({
			accessToken: null,
			refreshToken: null,
			isAuth: false,
		})
	},
}))
