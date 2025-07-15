import {
	HeartOutlined,
	MessageOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons'
import { Card, Col, Row } from 'antd'

interface UserStatsProps {
	posts?: number
	comments?: number
	followers?: number
	following?: number
	loading?: boolean
}

interface StatItem {
	title: string
	value: number
	icon: React.ReactNode
	color: string
}

export const UserStats = ({
	posts = 0,
	comments = 0,
	followers = 0,
	following = 0,
	loading = false,
}: UserStatsProps) => {
	const stats: StatItem[] = [
		{
			title: 'Postlar',
			value: posts,
			icon: <MessageOutlined />,
			color: '#1890ff',
		},
		{
			title: 'Izohlar',
			value: comments,
			icon: <MessageOutlined />,
			color: '#52c41a',
		},
		{
			title: 'Obunachilar',
			value: followers,
			icon: <HeartOutlined />,
			color: '#f5222d',
		},
		{
			title: "Obuna bo'lganlar",
			value: following,
			icon: <UsergroupAddOutlined />,
			color: '#722ed1',
		},
	]

	return (
		<div style={{ padding: '16px' }}>
			<Row gutter={[24, 24]}>
				{stats.map((stat, index) => (
					<Col xs={12} sm={12} md={6} key={index}>
						<Card
							bordered={false}
							hoverable
							style={{
								textAlign: 'center',
								borderRadius: '12px',
								backgroundColor: '#ffffff',
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								transition: 'all 0.3s ease',
							}}
							bodyStyle={{ padding: '24px 16px' }}
						>
							<div style={{ marginBottom: '12px' }}>
								<span
									style={{
										color: stat.color,
										fontSize: '32px',
										display: 'block',
										marginBottom: '8px',
									}}
								>
									{stat.icon}
								</span>
								<div
									style={{
										fontSize: '28px',
										fontWeight: 'bold',
										color: '#1f2937',
										marginBottom: '4px',
									}}
								>
									{loading
										? '...'
										: stat.value.toLocaleString()}
								</div>
								<div
									style={{
										fontSize: '14px',
										color: '#6b7280',
										fontWeight: '500',
									}}
								>
									{stat.title}
								</div>
							</div>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	)
}
