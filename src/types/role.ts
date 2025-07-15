export interface Permission {
	id: number
	name: string
	content_type: {
		id: number
		app_label: string
		model: string
	}
	codename: string
}

export interface Role {
	id?: string
	guid?: string
	name: string
	name_en: string
	name_krl: string
	name_ru: string
	permissions: number[]
	description: string
}

export interface CreateRoleRequest {
	name: string
	name_en: string
	name_krl: string
	name_ru: string
	permissions: number[]
	description: string
}

export interface UpdateRoleRequest extends CreateRoleRequest {}
