import { useRoutes } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { createIndexRoute, createRoute } from './util'

import { Layout } from '../layout/layout'
import {
	Auth,
	Certificates,
	Dashboard,
	Profile,
	SignUp,
	UserPermissions,
	UsersList,
} from './loadable'
import { Protected } from './protected'
import { Public } from './public'

export const Router = () => {
	return useRoutes([
		{
			element: <Public />,
			children: [
				createRoute(ROUTES.login, <Auth />),
				createRoute(ROUTES.signup, <SignUp />),
			],
		},

		{
			element: (
				<Protected
					isAuth={true}
					role={['SUPERADMIN', 'ADMIN', 'TINGLOVCHI']}
				/>
			),
			children: [
				createRoute('/', <Layout />, [
					// Dashboard
					createRoute(ROUTES.dashboard, null, [
						createIndexRoute(<Dashboard />),
					]),

					createRoute(ROUTES.profile, <Profile />),
					///users
					createRoute(ROUTES.users.root, null, [
						createRoute(ROUTES.users.list, <UsersList />),
					]),
					createRoute(ROUTES.permissions, null, [
						createIndexRoute(<UserPermissions />),
					]),
					createRoute(ROUTES.certificates, null, [
						createIndexRoute(<Certificates />),
					]),
				]),
			],
		},
	])
}
