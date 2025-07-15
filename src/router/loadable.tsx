import { getLoadablePage } from './util'

// auth
export const Auth = getLoadablePage('Login', 'auth/login')

// pages
export const Dashboard = getLoadablePage('Dashboard', 'dashboard/dashboard')
//profile
export const Profile = getLoadablePage('Profile', 'profile')
// users
export const UsersList = getLoadablePage('UserList', 'users/userList')

export const UserPermissions = getLoadablePage(
	'UserPermissions',
	'users/userPermissions'
)
//certificate
export const Certificates = getLoadablePage(
	'Certificates',
	'certificates/certificates'
)
