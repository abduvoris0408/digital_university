import {
	AuditOutlined,
	BarChartOutlined,
	DownOutlined,
	SafetyCertificateOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { ROUTES } from '../../../constants/routes'
import { usePathname } from '../../../lib/hooks/usePathname'
import { history } from '../../../utils/history'
import { AntMenu } from '../../style'

type Props = {
	collapsed?: boolean
}

export const Menu = ({ collapsed = false }: Props) => {
	const { decodedPathname } = usePathname()

	const menuItems = [
		{
			key: ROUTES.dashboard,
			icon: <BarChartOutlined />,
			label: 'Dashboard',
		},
		{
			key: ROUTES.users.root,
			icon: <TeamOutlined />,
			label: 'Foydalanuvchilar',
			children: [
				{
					key: `${ROUTES.users.root}/${ROUTES.users.list}`,
					icon: <UserOutlined />,
					label: 'Foydalanuvchilar',
				},

				{
					key: `${ROUTES.users.root}/${ROUTES.users.role}`,
					icon: <SafetyCertificateOutlined />,
					label: 'Foydalanuvchi ro`li',
				},
			],
		},
		{
			key: ROUTES.certificates,
			icon: <AuditOutlined />,
			label: 'Sertifikatlar',
		},
	]

	const { selectedKeys, defaultOpenKeys } = useMemo(() => {
		const currentPath = decodedPathname

		let selectedKey = currentPath
		let openKey: string[] = []

		if (currentPath.startsWith(ROUTES.users.root)) {
			openKey = [ROUTES.users.root]
			if (currentPath === ROUTES.users.root) {
				selectedKey = ROUTES.users.root
			}
		}

		return {
			selectedKeys: [selectedKey],
			defaultOpenKeys: openKey,
		}
	}, [decodedPathname])

	const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys)

	useEffect(() => {
		setOpenKeys(defaultOpenKeys)
	}, [defaultOpenKeys])

	const handleClick: MenuProps['onClick'] = ({ key, domEvent }) => {
		domEvent.preventDefault()
		domEvent.stopPropagation()
		history.push(key)
	}

	const handleOpenChange: MenuProps['onOpenChange'] = keys => {
		setOpenKeys(keys)
	}

	return (
		<AntMenu
			className='px-4 py-4'
			expandIcon={({ isOpen }) => (
				<DownOutlined
					className='expanded-icon'
					style={{
						transform: `rotate(${isOpen ? '180deg' : 0})`,
						fontSize: 10,
						width: 10,
						minWidth: 10,
					}}
				/>
			)}
			items={menuItems}
			selectedKeys={selectedKeys}
			openKeys={openKeys}
			onOpenChange={handleOpenChange}
			onClick={handleClick}
			mode='inline'
			style={{ height: '100%' }}
			inlineCollapsed={collapsed}
		/>
	)
}
