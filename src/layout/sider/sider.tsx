import { Link } from 'react-router-dom'
import { LayoutSider } from '../style'
import { Menu } from './menu/menu'

type Props = {
	collapsed: boolean
	setCollapsed: (val: boolean) => void
}

export const Sider = ({ collapsed, setCollapsed }: Props) => {
	return (
		<LayoutSider
			collapsed={collapsed}
			width={256}
			style={{
				background: 'white',
				height: '100%',
			}}
		>
			<div className=' px-4 py-3'>
				<Link to='/dashboard' className='flex items-center gap-2'>
					<img
						src='/src/assets/images/logo.jpg'
						alt='Logo'
						className='h-[52px] object-contain'
					/>
					{!collapsed && (
						<span className='text-[18px] text-blue-400 font-medium leading-snug break-words'>
							Digital University
						</span>
					)}
				</Link>
			</div>

			<Menu collapsed={collapsed} />
		</LayoutSider>
	)
}
