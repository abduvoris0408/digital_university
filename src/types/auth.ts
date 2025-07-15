export type TUser = {
	_id: string
	phone: string
	email: string
	first_name: string
	last_name: string
	gender: string
	region: string
	age: number
	birth_date: Date | string
	password: string
	diamonds: number
	active_days: number
	role: string
}
export type TLogin = {
	username: string
	password: string
}

export type TTokens = {
	accessToken: string
	refreshToken: string
}
export type TLoginResponse = {
	data: {
		access: string
		refresh: string
	}
}
export const PERMISSIONS = {
	READ: 'READ',
	CREATE: 'CREATE',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
	MANAGE: 'MANAGE',
} as const

export type TPermissions = {
	module: string
	permissions: (typeof PERMISSIONS)[keyof typeof PERMISSIONS][]
}
