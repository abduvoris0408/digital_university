import type { PERMISSIONS, ROLE } from './enums'

export type TLogin = {
	username: string
	password: string
	captcha?: string
	captcha_key?: string
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
export type TFile = {
	_id: string
	url: string
	file_type: FILE_TYPES
}
export type TUser = {
	id: string
	phone: string
	email: string
	first_name: string
	last_name: string
	gender: string
	region: string
	age: number
	role: ROLE
	birth_date: Date | string
	password: string
	diamonds: number
	avatar: TFile
	active_days: number
	permissions: TPermissions[]
}
export type TPermissions = {
	module: string
	permissions: PERMISSIONS[]
}
export type AuthProps = {
	isAuth: boolean | null
	role: ROLE | ROLE[]
}
