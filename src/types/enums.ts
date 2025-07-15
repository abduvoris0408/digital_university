export const PERMISSIONS = {
	READ: 'READ',
	CREATE: 'CREATE',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
	MANAGE: 'MANAGE',
} as const
export type PERMISSIONS = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]
export const ROLE = {
	SUPERADMIN: 'SUPERADMIN',
	ADMIN: 'ADMIN',
	TEACHER: 'TEACHER',
} as const
export type ROLE = (typeof ROLE)[keyof typeof ROLE]
