import { Column } from '@ant-design/charts'
import { Card, Col, Row, Statistic, Typography } from 'antd'
import { useGetStatistics } from '../../lib/query/useStatistics'

const { Title } = Typography

export const Dashboard = () => {
	const { data, isLoading } = useGetStatistics()

	const userByRole = data?.users_by_role || []
	const userByDay = data?.users_by_day || []

	return (
		<div className='p-4'>
			<Title level={3}>Statistika</Title>

			<Row gutter={[16, 16]}>
				<Col span={8}>
					<Card loading={isLoading}>
						<Statistic
							title='Foydalanuvchilar soni'
							value={data?.total_users || 0}
						/>
					</Card>
				</Col>

				<Col span={8}>
					<Card loading={isLoading}>
						<Statistic
							title='Guruhlar soni'
							value={data?.group_count || 0}
						/>
					</Card>
				</Col>

				<Col span={8}>
					<Card loading={isLoading}>
						<Statistic
							title='To‘langan summa'
							value={data?.total_payment_paid || 0}
							precision={2}
							suffix='so‘m'
						/>
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} className='mt-6'>
				<Col span={12}>
					<Card
						loading={isLoading}
						title='Rol bo‘yicha foydalanuvchilar'
					>
						<Column
							data={userByRole}
							xField='role__name'
							yField='count'
							colorField='role__name'
							legend={false}
							height={300}
							autoFit
							columnStyle={{
								radius: [4, 4, 0, 0],
							}}
						/>
					</Card>
				</Col>

				<Col span={12}>
					<Card loading={isLoading} title='Kunlik foydalanuvchilar'>
						<Column
							data={userByDay}
							xField='day'
							yField='count'
							colorField='day'
							legend={false}
							height={300}
							autoFit
							columnStyle={{
								radius: [4, 4, 0, 0],
							}}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
