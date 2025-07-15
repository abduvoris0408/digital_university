import {
	CalendarOutlined,
	EditOutlined,
	EnvironmentOutlined,
	PhoneOutlined,
	UserOutlined,
} from '@ant-design/icons'
import {
	Avatar,
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Row,
	Select,
	Spin,
	Typography,
} from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import { useGetOneData } from '../../lib/query/userdata'
import type { IUser } from '../../types/user'

const { Title } = Typography
const { Option } = Select

const Profile = () => {
	const [form] = useForm()
	const [editing, setEditing] = useState(false)

	const { data: user, isLoading } = useGetOneData<IUser>({
		queryKey: ['user-profile'],
		useGuidFromMe: true,
	})

	useEffect(() => {
		if (!user) return
		form.setFieldsValue({
			...user,
			birthday: user?.birthday || '',
			user_category: user?.user_category?.title,
			country: user?.country_name?.name_uz,
			region: user?.region_name?.name_uz,
			district: user?.district_name?.name_uz,
			quarter: user?.quarter_name?.name_uz,
			role: user?.role?.map(r => r.name?.uz || r.name),
		})
	}, [user, form])

	if (isLoading || !user) {
		return (
			<div className='flex items-center justify-center min-h-screen'>
				<Spin size='large' />
			</div>
		)
	}

	return (
		<div className='p-4 flex flex-col gap-4'>
			<Col span={24}>
				<div className='bg-white rounded-xl p-4 text-center'>
					<Avatar
						size={100}
						src={user?.photo || undefined}
						icon={!user?.photo && <UserOutlined />}
					/>
					<Title level={5} className='mt-3'>
						{user?.surname || ''} {user?.name || user?.username}
					</Title>
					<div className='mt-4   flex items-center justify-evenly'>
						<p>
							<PhoneOutlined />{' '}
							{user?.phone_number || 'Kiritilmagan'}
						</p>
						<p>
							<CalendarOutlined />{' '}
							{user?.birthday || 'Kiritilmagan'}
						</p>
						<p>
							<EnvironmentOutlined />{' '}
							{user?.region_name?.name_uz || 'Kiritilmagan'}
						</p>
					</div>
				</div>
			</Col>

			<Col span={24}>
				<div className='bg-white rounded-xl px-5 py-5'>
					<div className='flex justify-between items-center mb-4'>
						<Title level={3}>Mening ma'lumotlarim</Title>
						<Button
							className='bg-blue-500'
							type='primary'
							onClick={() => setEditing(prev => !prev)}
							icon={<EditOutlined />}
						>
							{editing ? 'Bekor qilish' : 'Tahrirlash'}
						</Button>
					</div>

					<Form layout='vertical' form={form} disabled={!editing}>
						<Row gutter={[16, 16]}>
							<Col span={8}>
								<Form.Item label='Ism' name='name'>
									<Input placeholder='Ismni kiriting ...' />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Familiya' name='surname'>
									<Input placeholder='Familiyani kiriting ...' />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label='Otasining Ismi'
									name='middle_name'
								>
									<Input placeholder='Sharifni kiriting ...' />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label="Tug'ilgan Sana"
									name='birthday'
								>
									<DatePicker className='w-full' />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label='Telefon Raqami'
									name='phone_number'
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label='Telefon Raqami (2)'
									name='phone_number_2'
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Passport seriyasi va raqami'>
									<Input.Group compact>
										<Form.Item
											name='passport_seria'
											noStyle
										>
											<Input
												style={{ width: '30%' }}
												placeholder='Seria'
												maxLength={2}
											/>
										</Form.Item>
										<Form.Item
											name='passport_number'
											noStyle
										>
											<InputNumber
												style={{ width: '70%' }}
												placeholder='Number'
											/>
										</Form.Item>
									</Input.Group>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label='Passport JSHSHR'
									name='passport_data'
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Jinsi' name='gender'>
									<Select>
										<Option value={1}>Male</Option>
										<Option value={2}>Female</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Mamlakat' name='country'>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Viloyat' name='region'>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Tuman' name='district'>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Manzil' name='quarter'>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Kasbi' name='profession'>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label='Foydalanuvchi Kategoriyasi'
									name='user_category'
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Roli' name='role'>
									<Select mode='multiple' disabled>
										{user.role.map(r => (
											<Option key={r.id}>
												{r.name?.uz}
											</Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									label='Foydalanuvchi Nomi'
									name='username'
								>
									<Input disabled />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label='Parol'>
									<Input.Password disabled value='********' />
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>
			</Col>
		</div>
	)
}

export default Profile
