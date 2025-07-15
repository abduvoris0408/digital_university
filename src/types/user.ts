import type { TPermissions } from './auth'

export interface IRole {
	id: number
	guid: string
	name: {
		uz: string
		ru: string | null
		en: string | null
		krl: string | null
	}
	description: string
	created_at: string
}

export interface IUser {
	id: number
	guid: string
	username: string
	role: IRole[]
	user_type: string
	user_category: string | null
	room: string | null
	created_by: string | null
	name: string | null
	photo: string | null
	middle_name: string | null
	surname: string | null
	phone_number: string | null
	phone_number_2: string | null
	birthday: string | null
	country: string | null
	country_name: string | null
	region: string | null
	region_name: string | null
	district: string | null
	district_name: string | null
	quarter: string | null
	quarter_name: string | null
	gender: number
	profession: string | null
	passport_seria: string | null
	passport_number: number | null
	passport_data: string | null
	created_at: string
	title: string | null
	permissions?: TPermissions[]
	user:string
}

export interface UpdateUserRequest {
	role?: number[]
	name?: string
	middle_name?: string
	surname?: string
	phone_number?: string
	phone_number_2?: string
	birthday?: string
	country?: string
	region?: string
	district?: string
	quarter?: string
	gender?: number
	profession?: string
	passport_seria?: string
	passport_number?: number
	passport_data?: string
}

export interface ApiResponse<T> {
	status_code: number
	data: T
}
