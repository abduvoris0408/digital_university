import { useMemo } from 'react'
import { ROUTES } from '../../constants/routes'

export const useSelectedMenuOpenKey = (pathname: string) => {
	return useMemo(() => {
		const currentPath = pathname

		let selectedKey = currentPath
		let openKeys: string[] = []

		if (currentPath.startsWith(ROUTES.users.root)) {
			openKeys = [ROUTES.users.root]

			if (currentPath === ROUTES.users.root) {
				selectedKey = ROUTES.users.root
			}
		}

		return {
			selectedKeys: [selectedKey],
			openKeys: openKeys,
		}
	}, [pathname])
}
