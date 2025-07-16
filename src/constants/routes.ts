export const ROUTES = {
	login: '/login',
	signup: '/signup',
	dashboard: '/dashboard',
	profile: '/profile',

	users: {
		root: '/users',
		list: 'list',
		add: 'add',
		groups: 'groups',
		roleRoutes: {
			root: '/role',
			create: '/role/create',
			edit: (guid: string) => `/role/edit/${guid}`,
			view: (guid: string) => `/role/view/${guid}`,
		},
	},

	certificates: '/certificates',

	permissions: '/permissions',

	educationSettings: {
		root: '/education-settings',
		academicHour: 'academic-hour',
		buildings: 'buildings',
		floors: 'floors',
		roomType: 'room-type',
		rooms: 'rooms',
	},

	contracts: {
		root: '/contracts',
		courseTypes: 'course-types',
		contractTypes: 'contract-types',
		groupContract: 'group-contract',
		legalContract: 'legal-contract',
		physicalContract: 'physical-contract',
	},

	teachers: '/teachers',
	students: '/students',
	education: '/education',
} as const
