import { Navigate, Outlet } from 'react-router-dom'
import { Loading } from '../components/loading'
import { ROUTES } from '../constants/routes'
import { useToken } from '../lib/hooks/useToken'

export const Protected = () => {
	const { isAuth, isInitiated } = useToken()

	if (!isInitiated) return <Loading />

	return isAuth ? <Outlet /> : <Navigate to={ROUTES.login} replace />
}
