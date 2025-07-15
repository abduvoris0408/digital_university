import { useRoutes } from 'react-router-dom'

import { ROUTES } from '../constants/routes'
import { Protected } from './protected'
import { createIndexRoute, createRoute } from './util'

import { Layout } from '../layout/layout'
import {
	Auth,
	Certificates,
	Dashboard,
	Profile,
	UserPermissions,
	UsersList,
} from './loadable'
import { Public } from './public'

export const Router = () => {
	return useRoutes([
		{
			element: <Public />,
			children: [createRoute(ROUTES.login, <Auth />)],
		},

		{
			element: <Protected />,
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

						createRoute(ROUTES.users.role, <UserPermissions />),
					]),
					createRoute(ROUTES.certificates, null, [
						createIndexRoute(<Certificates />),
					]),
				]),
			],
		},
	])
}
