import type { TPermissions } from '../../types/auth'
import type { PERMISSIONS } from '../../types/enums'

export const hasPermission = (
	userPermissions: TPermissions[],
	module: string,
	required: PERMISSIONS
): boolean => {
	const target = userPermissions.find(p => p.module === module)
	return target?.permissions.includes(required) ?? false
}
