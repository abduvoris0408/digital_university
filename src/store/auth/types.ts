import type { TTokens, TUser } from '../../types/auth'

export interface IAuthStore {
	token: string | null
	isAuth: boolean | null
	isInitiated: boolean
	user: TUser | null
	accessToken: string

	logout: () => void
	setToken: (token: TTokens) => void
	setUser: (user?: TUser) => void
	setIsAuth: (isAuth: boolean) => void
	setIsInitiated: (isInitiated: boolean) => void
}
