import { useAuthStore } from '../../../store'
import { ROLE } from '../../../types/enums'
import { allMenuItems, type IMenuItem } from './constants'

export const useMenuItems = (): IMenuItem[] => {
	const { user, hasHydrated } = useAuthStore()

	if (!hasHydrated || user?.role !== ROLE.ADMIN) return []

	const items = allMenuItems()
	return items
}
