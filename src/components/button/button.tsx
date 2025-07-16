import { Button as AntButton } from 'antd'
import type { TButtonProps } from '../../types/components'

export const Button = ({
	label,
	icon,
	size = 'middle',
	...props
}: TButtonProps) => {
	return (
		<AntButton icon={icon} size={size} {...props}>
			{label}
		</AntButton>
	)
}
