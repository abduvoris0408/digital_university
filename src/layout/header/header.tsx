import {
	GlobalOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Flex } from 'antd'
import { useTheme } from 'antd-style'
import type { FC } from 'react'
import { Button } from '../../components/button/button'
import { useAppStore } from '../../store/app/app'
import { getShortLang } from '../../utils/general'
import { LayoutHeader } from '../style'
import { LanguageDropdown } from './languageDropdown/dropdown'
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
	const { language } = useAppStore()

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

			<Flex align='center' gap={8} justify='end' style={style}>
				<LanguageDropdown
					customBtn={
						<Button
							shape='circle'
							type='link'
							size='large'
							label={getShortLang(language)}
							icon={<GlobalOutlined />}
							style={style}
						/>
					}
				/>
				<ProfileDropdown />
			</Flex>
		</LayoutHeader>
	)
}
