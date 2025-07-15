export type Certificate = {
	id: number
	guid: string
	description: string
	is_mediator: boolean
	academic_hour: number
	text_font_size: number
	bottom_font_size: number
	director_name: string
	created_at: string
	initialValues: string
	user: {
		id: number
		name: string
		surname: string
		middle_name: string
	}
	groups: {
		title: string
		start_date: string
		end_date: string
	}
}
