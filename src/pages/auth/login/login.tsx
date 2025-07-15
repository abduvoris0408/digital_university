import { LockOutlined, UserOutlined } from '@ant-design/icons'
import {
	Button,
	Checkbox,
	Col,
	Flex,
	Form,
	Input,
	Row,
	Typography,
	type FormProps,
} from 'antd'
import WelcomeAnimation from '../../../components/lottie/WelcomeAnimation'
import { useLogin } from '../../../lib/services/mutations/loginMutations'
import type { TLogin } from '../../../types/auth'

const { Title, Text, Link } = Typography

export const Login = () => {
	const { mutate, isPending } = useLogin()
	const onFinish: FormProps<TLogin>['onFinish'] = values => {
		mutate(values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Row
			style={{
				minHeight: '100vh',
				overflow: 'hidden',
			}}
		>
			<Col xs={24} lg={12}>
				<Flex
					vertical
					align='center'
					justify='center'
					className='text-center'
					style={{
						height: '100%',
						padding: '1rem',
						backgroundColor: '#007BFF	',
					}}
				>
					<WelcomeAnimation />
					<p className='text-white text-3xl font-bold mb-4'>
						Digital University tizimiga xush kelibsiz
					</p>
					<Text className='text-white' style={{ fontSize: 18 }}>
						Iltimos, tizimga kirish uchun maʼlumotlaringizni
						kiriting.
					</Text>
				</Flex>
			</Col>

			<Col xs={24} lg={12}>
				<Flex
					vertical
					align={'center'}
					justify='center'
					style={{
						height: '100%',
						padding: '2rem',
						width: '100%',
						gap: '1rem',
					}}
				>
					<Title className='m-0'>Tizimga kirish</Title>

					<Flex gap={8} style={{ marginBottom: '1rem' }}>
						<Text>Akkauntingiz yo‘qmi?</Text>
						<Link href={'/signup'}>Ro‘yxatdan o‘ting</Link>
					</Flex>

					<Form
						name='sign-in-form'
						layout='vertical'
						initialValues={{
							email: '',
							password: '',
							remember: true,
						}}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
						requiredMark={false}
						style={{ width: '100%', maxWidth: 400 }}
					>
						<Form.Item<TLogin>
							name='username'
							label='Loginingizni kiriting'
							rules={[
								{
									required: true,
									message: ' kiriting',
								},
							]}
						>
							<Input
								autoComplete='username'
								style={{ padding: '8px' }}
								placeholder='Loginingizni kiriting'
								prefix={<UserOutlined />}
							/>
						</Form.Item>

						<Form.Item<TLogin>
							label='Parol'
							name='password'
							rules={[
								{
									required: true,
									message: 'Parolingizni kiriting',
								},
							]}
						>
							<Input.Password
								autoComplete='current-password'
								style={{ padding: '8px' }}
								placeholder='Parolingizni kiriting'
								prefix={<LockOutlined />}
							/>
						</Form.Item>

						<Flex
							justify='space-between'
							align='center'
							style={{ marginBottom: 24 }}
						>
							<Form.Item<TLogin> valuePropName='checked' noStyle>
								<Checkbox>Meni eslab qol</Checkbox>
							</Form.Item>
							<Link
								href={'/forgot-password'}
								className='text-blue-500'
							>
								Parolni unutdingizmi?
							</Link>
						</Flex>

						<Form.Item>
							<Button
								className='bg-blue-500 text-white'
								type='primary'
								htmlType='submit'
								block
								size='large'
								loading={isPending}
							>
								Tizimga kirish
							</Button>
						</Form.Item>
					</Form>
				</Flex>
			</Col>
		</Row>
	)
}
