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
		icon: (
			<img
				src={
					'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.advantour.com%2Fuzbekistan%2Fflag.htm&psig=AOvVaw0niGZ8mpLOQgaFke1pYGo2&ust=1752042687040000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCRk-LRrI4DFQAAAAAdAAAAABAE'
				}
				width={16}
				height={16}
			/>
		),
		label: "O'zbekcha",
		key: 'uz',
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
