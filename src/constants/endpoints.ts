export const ENDPOINTS = {
	login: '/base/login/',
	refreshToken: '/base/token-refresh/',
	statistics: '/statistics/list/',
	getMe: '/auth/getme/',

	certificates: {
		list: '/certificate/list/',
		create: '/certificate/create/',
		update: '/certificate/retrieve-update',
		delete: '/certificate/destroy',
	},

	users: {
		role: 'user/role/',
		list: '/user/list/',
		create: '/user/create/',
		update: (guid: string) => `/user/retrieve-update/${guid}/`,
		delete: (guid: string) => `/user/destroy/${guid}/`,
		retrieve: (guid: string) => `/user/retrieve/${guid}/`,
	},
}
