import { useAuthStore } from '../../store'
import type { TPermissions } from '../../types/auth'
import { PERMISSIONS, ROLE } from '../../types/enums'

export type ModulesName =
	| 'USERS'
	| 'GROUPS'
	| 'DASHBOARD'
	| 'PERMISSION'
	| 'CERTIFICATE'

type PermissionMap = {
	[module in ModulesName]: {
		[permission in PERMISSIONS]: boolean
	}
}

const modules: ModulesName[] = ['USERS', 'GROUPS', 'PERMISSION', 'CERTIFICATE']

export const usePermissionChecking = (): Partial<PermissionMap> => {
	const { user } = useAuthStore()

	const permissionMap: Partial<PermissionMap> = {}

	if (user?.role === ROLE.SUPERADMIN) {
		modules.forEach(module => {
			permissionMap[module] = {} as { [key in PERMISSIONS]: boolean }
			Object.values(PERMISSIONS).forEach(permission => {
				permissionMap[module]![permission] = true
			})
		})
	} else if (user?.permissions) {
		user.permissions.forEach((perm: TPermissions) => {
			const moduleKey = perm.module as ModulesName
			if (!permissionMap[moduleKey]) {
				permissionMap[moduleKey] = {} as {
					[key in PERMISSIONS]: boolean
				}
			}

			Object.values(PERMISSIONS).forEach(permission => {
				permissionMap[moduleKey]![permission] =
					perm.permissions.includes(permission)
			})

			if (user.role == ROLE.ADMIN && moduleKey == 'USERS') {
				permissionMap[moduleKey] = {} as {
					[key in PERMISSIONS]: boolean
				}
				Object.values(PERMISSIONS).forEach(permission => {
					permissionMap[moduleKey]![permission] =
						permission !== PERMISSIONS.DELETE &&
						permission !== PERMISSIONS.UPDATE &&
						permission !== PERMISSIONS.CREATE
				})
			}
		})
	}

	return permissionMap
}
