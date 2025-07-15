import { Layout as AntLayout } from 'antd'
import { useTheme } from 'antd-style'
import { useUIStore } from '../store/layout/ui-store'
import { Content } from './content/content'
import { Header } from './header'
import { Sider } from './sider'

export const Layout = () => {
	const { colorBgContainer, colorBgLayout } = useTheme()

	const { collapsed, setCollapsed } = useUIStore()

	return (
		<AntLayout style={{ height: '100%' }}>
			<Header
				bg={colorBgContainer}
				collapsed={collapsed}
				setCollapsed={setCollapsed}
			/>
			<AntLayout style={{ height: '100%' }}>
				<Sider collapsed={collapsed} setCollapsed={setCollapsed} />
				<Content collapsed={collapsed} bg={colorBgLayout} />
			</AntLayout>
		</AntLayout>
	)
}
