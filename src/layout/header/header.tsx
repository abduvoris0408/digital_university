import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useTheme } from 'antd-style'
import type { FC } from 'react'
import { LayoutHeader } from '../style'
import { ProfileDropdown } from './profileDropDown'

type Props = {
	bg: string
	collapsed: boolean
	setCollapsed: (val: boolean) => void
}

export const Header: FC<Props> = ({ bg, collapsed, setCollapsed }) => {
	const { colorPrimary } = useTheme()
	const style = {
		color: colorPrimary,
	}

	return (
		<LayoutHeader $bg={bg}>
			<Flex align='center' gap='middle' style={style}>
				<Button
					style={{ marginLeft: collapsed ? 30 : 206 }}
					type='text'
					icon={
						collapsed ? (
							<MenuUnfoldOutlined />
						) : (
							<MenuFoldOutlined />
						)
					}
					onClick={() => setCollapsed(!collapsed)}
				/>
			</Flex>

			<Flex align='center' gap='middle' style={style}>
				<ProfileDropdown />
			</Flex>
		</LayoutHeader>
	)
}
