import { PERMISSIONS } from '@/types'
import { useAuthStore } from '../../store'
import { ROLE } from '../../types/enums'

export type ModulesName = 'MODULES'

type PermissionMap = {
	[module in ModulesName]: {
		[permission in PERMISSIONS]: boolean
	}
}

const modules: ModulesName[] = ['MODULES']

export const usePermissionChecking = (): Partial<PermissionMap> => {
	const { user } = useAuthStore()
	const permissionMap: Partial<PermissionMap> = {}

	// 1. ADMIN — barcha permissions ruxsat
	if (user?.role === ROLE.ADMIN) {
		modules.forEach(module => {
			permissionMap[module] = Object.fromEntries(
				Object.values(PERMISSIONS).map(p => [p, true])
			) as Record<PERMISSIONS, boolean>
		})
		return permissionMap
	}

	return permissionMap
}
