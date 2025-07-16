import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

type ItemType = Required<MenuProps>['items'][number]

type ModalProps = {
	onClicks?: (() => void)[]
}

export const profileModalMenu = ({ onClicks }: ModalProps): ItemType[] => [
	{
		icon: <UserOutlined style={{ fontSize: 16 }} />,
		label: 'Profil',
		key: '/#/profile',
		onClick: onClicks ? onClicks[0] : undefined,
	},

	{
		icon: <LogoutOutlined style={{ fontSize: 16 }} />,
		label: 'Log out',
		key: '2',
		onClick: onClicks ? onClicks[1] : undefined,
		danger: true,
	},
]

export const languageModalMenu = [
	{
		key: 'uz',
		icon: (
			<img src='https://flagcdn.com/h20/uz.png' height='20' alt='Uzbek' />
		),
		label: "O'zbekcha",
	},
	{
		key: 'ru',
		icon: (
			<img
				src='https://flagcdn.com/h20/ru.png'
				height='20'
				width='40'
				alt='Russian'
			/>
		),
		label: 'Русский',
	},
	{
		key: 'en',
		icon: (
			<img
				src='https://flagcdn.com/h20/us.png'
				height='20'
				width='40'
				alt='English'
			/>
		),
		label: 'English',
	},
]

export const dropDownMenu = [
	{
		label: 'light',
		value: 'light',
	},
	{
		label: 'dark',
		value: 'dark',
	},
	{
		label: 'system',
		value: 'system',
	},
]
