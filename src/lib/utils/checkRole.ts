// import { ROLE } from '../../types/enums'
// import { errorMessage } from '../../utils/messages'

// export const checkRole = (
// 	userRole: ROLE,
// 	allowedRoles: ROLE[],
// 	logout?: () => void
// ): boolean => {
// 	if (allowedRoles.includes(userRole)) {
// 		return true
// 	}

// 	errorMessage('Forbidden, you are not a staff or student!')
// 	logout?.()
// 	return false
// }
import { ROLE } from '../../types/enums'
import { errorMessage } from '../../utils/messages'

export const checkRole = (
	userRole: string,
	allowedRoles: ROLE[],
	logout?: () => void
): boolean => {
	if (!userRole) {
		errorMessage('Foydalanuvchi roli aniqlanmadi!')
		logout?.()
		return false
	}

	if (Array.isArray(userRole)) {
		const roleNames = userRole.map(r =>
			typeof r === 'string' ? r : r.name?.uz
		)

		const hasMatch = roleNames.some(role => allowedRoles.includes(role))
		if (hasMatch) return true
	} else {
		const roleName =
			typeof userRole === 'string' ? userRole : userRole.name?.uz
		if (allowedRoles.includes(roleName)) return true
	}

	errorMessage('Forbidden, you are not a staff or student!')
	logout?.()
	return false
}
