import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { LayoutContent } from '../style'
import type { Props } from '../type'

export const Content: FC<Props> = ({ bg, collapsed }) => {
	return (
		<LayoutContent
			collapsed={collapsed}
			$bg={bg}
			style={{ height: '100%' }}
		>
			<Outlet />
		</LayoutContent>
	)
}
