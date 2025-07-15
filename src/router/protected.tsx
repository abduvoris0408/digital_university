// import { Navigate, Outlet } from 'react-router-dom'
// import { Loading } from '../components/loading'
// import { ROUTES } from '../constants/routes'
// import { useToken } from '../lib/hooks/useToken'

// export const Protected = () => {
// 	const { isAuth, isInitiated } = useToken()

// 	if (!isInitiated) return <Loading />

// 	return isAuth ? <Outlet /> : <Navigate to={ROUTES.login} replace />
// }
// src/router/Protected.tsx

import type { FC } from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useToken } from '../lib/hooks/useToken'
import { checkRole } from '../lib/utils/checkRole'
import { useAuthStore } from '../store'
import type { AuthProps } from '../types/auth'

export const Protected: FC<AuthProps> = ({ role }) => {
	const { isAuth, isInitiated } = useToken()
	const { logout, user } = useAuthStore()
	const allowedRoles = Array.isArray(role) ? role : [role]
	const isAllowed = user && checkRole(user.role, allowedRoles, logout)
	useEffect(() => {
		if (isAuth && isInitiated && user && !isAllowed) {
			console.log('❌ Role not allowed, logging out...')
			logout()
		}
	}, [isAuth, isInitiated, user, isAllowed, logout])
	if (!isInitiated) return null
	if (!isAuth || !user || !isAllowed) return <Navigate to={ROUTES.login} />

	return <Outlet />
}
