import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'

const ActionPopover = () => {
	const content = (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 8,
				minWidth: 150,
				padding: 10,
			}}
		>
			<Button
				type='text'
				icon={<EyeOutlined />}
				style={{ justifyContent: 'flex-start', color: '#1890ff' }}
			>
				Ko‘rish
			</Button>
			<Button
				type='text'
				icon={<EditOutlined />}
				style={{ justifyContent: 'flex-start', color: '#722ED1' }}
			>
				Tahrirlash
			</Button>
			<Button
				type='text'
				icon={<DeleteOutlined />}
				danger
				style={{ justifyContent: 'flex-start' }}
			>
				O‘chirish
			</Button>
		</div>
	)

	return (
		<Popover
			className='flex items-center'
			content={content}
			trigger={['hover', 'click']}
			placement='left'
			overlayStyle={{ padding: 0 }}
		>
			<p className='text-blue-500'>Ko`rish</p>
			<Button type='link' icon={<EyeOutlined />} title='Ko`rish' />
		</Popover>
	)
}

export default ActionPopover
