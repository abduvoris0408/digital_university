import { create } from 'zustand'

import { devtools } from 'zustand/middleware'
import {
	getLocalStorage,
	removeLocalStorage,
	setLocalStorage,
} from '../../lib/utils/storage'
import type { TTokens } from '../../types/auth'
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from '../../utils/general'
import { createSelectors } from '../createSelectors'
import type { IAuthStore } from './types'

const useAppBase = create<IAuthStore>()(
	devtools(set => ({
		token: getLocalStorage(ACCESS_TOKEN),
		refreshToken: getLocalStorage(REFRESH_TOKEN),
		user: getLocalStorage(USER),
		isAuth: null,
		isInitiated: true,

		logout: () =>
			set(state => {
				removeLocalStorage(ACCESS_TOKEN)
				removeLocalStorage(USER)
				removeLocalStorage(REFRESH_TOKEN)

				return {
					...state,
					token: null,
					refreshToken: null,
					user: null,
					isAuth: false,
				}
			}),

		setToken: ({ accessToken, refreshToken }: TTokens) =>
			set(state => {
				setLocalStorage(ACCESS_TOKEN, accessToken)
				setLocalStorage(REFRESH_TOKEN, refreshToken)

				return {
					...state,
					token: accessToken,
					refreshToken: refreshToken,
					isAuth: true,
				}
			}),
		setIsAuth: isAuth => set(() => ({ isAuth })),
		setIsInitiated: isInitiated => set(() => ({ isInitiated })),
		setUser: user =>
			set(state => {
				if (!user) return state
				setLocalStorage(USER, user)

				return {
					...state,
					user,
				}
			}),
	}))
)

export const useAuthStore = createSelectors(useAppBase)

export const initializeAuthStore = () => {
	const { logout } = useAuthStore.getState()

	return {
		logout,
	}
}
