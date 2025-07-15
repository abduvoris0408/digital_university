import {
	ApartmentOutlined,
	AppstoreOutlined,
	AuditOutlined,
	BankOutlined,
	BookOutlined,
	ClockCircleOutlined,
	ClusterOutlined,
	FileTextOutlined,
	HomeOutlined,
	IdcardOutlined,
	SecurityScanOutlined,
	SolutionOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useMemo } from 'react'
import { ROUTES } from '../../../constants/routes'
import { hasPermission } from '../../../lib/utils/hasPermission'
import { useAuthStore } from '../../../store'
import { PERMISSIONS } from '../../../types/enums'

export const useMenuItems = (): MenuProps['items'] => {
	const { user } = useAuthStore()

	return useMemo(() => {
		if (!user) return []

		const isAdmin = Array.isArray(user.role)
			? user.role.some(r => r.name?.uz === 'ADMIN')
			: user.role === 'ADMIN'

		const perms = user.permissions || []

		const can = (mod: string) =>
			isAdmin || hasPermission(perms, mod, PERMISSIONS.READ)

		const menuItems: MenuProps['items'] = []

		// Dashboard
		if (can('DASHBOARD')) {
			menuItems.push({
				key: ROUTES.dashboard,
				icon: <HomeOutlined />,
				label: 'Bosh sahifa',
			})
		}

		// Rollar va ruxsatlar
		if (can('PERMISSION')) {
			menuItems.push({
				key: ROUTES.permissions,
				icon: <SecurityScanOutlined />,
				label: 'Rollar va ruxsatlar',
			})
		}

		// Ta’lim sozlamalari
		const educationChildren: MenuProps['items'] = []

		if (can('ACADEMIC_HOUR')) {
			educationChildren.push({
				key: `${ROUTES.educationSettings.root}/${ROUTES.educationSettings.academicHour}`,
				icon: <ClockCircleOutlined />,
				label: 'Academik soat',
			})
		}
		if (can('BUILDING')) {
			educationChildren.push({
				key: `${ROUTES.educationSettings.root}/${ROUTES.educationSettings.buildings}`,
				icon: <BankOutlined />,
				label: 'Binolar',
			})
		}
		if (can('FLOOR')) {
			educationChildren.push({
				key: `${ROUTES.educationSettings.root}/${ROUTES.educationSettings.floors}`,
				icon: <ApartmentOutlined />,
				label: 'Qavatlar',
			})
		}
		if (can('ROOM_TYPE')) {
			educationChildren.push({
				key: `${ROUTES.educationSettings.root}/${ROUTES.educationSettings.roomType}`,
				icon: <AppstoreOutlined />,
				label: 'Xona turi',
			})
		}
		if (can('ROOM')) {
			educationChildren.push({
				key: `${ROUTES.educationSettings.root}/${ROUTES.educationSettings.rooms}`,
				icon: <ClusterOutlined />,
				label: 'Xonalar',
			})
		}
		if (educationChildren.length) {
			menuItems.push({
				key: ROUTES.educationSettings.root,
				icon: <BookOutlined />,
				label: "Ta'lim sozlamalari",
				children: educationChildren,
			})
		}

		// Foydalanuvchilar
		const usersChildren: MenuProps['items'] = []

		if (can('USERS')) {
			usersChildren.push({
				key: `${ROUTES.users.root}/${ROUTES.users.list}`,
				icon: <UserOutlined />,
				label: 'Foydalanuvchilar',
			})
		}
		if (can('TEACHER')) {
			usersChildren.push({
				key: ROUTES.teachers,
				icon: <IdcardOutlined />,
				label: "O'qituvchilar",
			})
		}
		if (can('STUDENT')) {
			usersChildren.push({
				key: ROUTES.students,
				icon: <SolutionOutlined />,
				label: 'Tinglovchilar',
			})
		}
		if (usersChildren.length) {
			menuItems.push({
				key: ROUTES.users.root,
				icon: <TeamOutlined />,
				label: 'Foydalanuvchilar',
				children: usersChildren,
			})
		}

		// Shartnomalar
		const contractChildren: MenuProps['items'] = []

		if (can('COURSE_TYPE')) {
			contractChildren.push({
				key: `${ROUTES.contracts.root}/${ROUTES.contracts.courseTypes}`,
				icon: <AppstoreOutlined />,
				label: 'Kurs turlari',
			})
		}
		if (can('CONTRACT_TYPE')) {
			contractChildren.push({
				key: `${ROUTES.contracts.root}/${ROUTES.contracts.contractTypes}`,
				icon: <AppstoreOutlined />,
				label: 'Shartnoma turlari',
			})
		}
		if (can('GROUP_CONTRACT')) {
			contractChildren.push({
				key: `${ROUTES.contracts.root}/${ROUTES.contracts.groupContract}`,
				icon: <TeamOutlined />,
				label: 'Guruh shartnomasi',
			})
		}
		if (can('LEGAL_CONTRACT')) {
			contractChildren.push({
				key: `${ROUTES.contracts.root}/${ROUTES.contracts.legalContract}`,
				icon: <FileTextOutlined />,
				label: 'Yuridik shartnoma',
			})
		}
		if (can('PHYSICAL_CONTRACT')) {
			contractChildren.push({
				key: `${ROUTES.contracts.root}/${ROUTES.contracts.physicalContract}`,
				icon: <FileTextOutlined />,
				label: 'Jismoniy shartnoma',
			})
		}
		if (contractChildren.length) {
			menuItems.push({
				key: ROUTES.contracts.root,
				icon: <AuditOutlined />,
				label: 'Shartnomalar',
				children: contractChildren,
			})
		}

		// Ta’lim
		if (can('EDUCATION')) {
			menuItems.push({
				key: ROUTES.education,
				icon: <BookOutlined />,
				label: "Ta'lim",
			})
		}

		return menuItems
	}, [user])
}
