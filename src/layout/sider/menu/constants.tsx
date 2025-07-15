import { BarChartOutlined } from '@ant-design/icons'
import type { JSX } from 'react'
import { ROUTES } from '../../../constants/routes'

export interface IMenuItem {
	key: string
	icon?: JSX.Element
	label: string
	children?: IMenuItem[]
}

export const allMenuItems = (): IMenuItem[] => [
	{
		key: ROUTES.dashboard,
		icon: <BarChartOutlined />,
		label: 'Dashboard',
	},
]
