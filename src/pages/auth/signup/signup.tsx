import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Typography,
	message,
	notification,
} from 'antd'
import { useEffect, useState } from 'react'
import SignUpAnimation from '../../../components/lottie/SignUpAnimation'
import { api } from '../../../lib/services/api'
import { history } from '../../../utils/history'

const { Title, Text, Link } = Typography

export const SignUp = () => {
	const [form] = Form.useForm()
	const [username, setUsername] = useState('')
	const [step, setStep] = useState<'create' | 'verify'>('create')
	const [verificationRequested, setVerificationRequested] = useState(false)
	const [time, setTime] = useState<number>(180)
	const [resetCode, setResetCode] = useState(true)

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (verificationRequested) {
			timer = setInterval(() => {
				setTime(prev => {
					if (prev <= 1) {
						clearInterval(timer)
						setResetCode(false)
						return 0
					}
					return prev - 1
				})
			}, 1000)
		}
		return () => clearInterval(timer)
	}, [verificationRequested])

	const createMutation = useMutation({
		mutationFn: async (values: any) =>
			api.post('/user/student-create/', values),
		onSuccess: (_, variables) => {
			setUsername(variables.username)
			setVerificationRequested(true)

			notification.info({
				message: '📲 SMS kodi yuborildi',
				description: (
					<>
						Botga kirib{' '}
						<a
							href='https://t.me/raqamli_insitut_bot'
							target='_blank'
						>
							@raqamli_insitut_bot
						</a>{' '}
						ga <b>/start</b> buyrug‘ini yuboring va SMS tasdiqlang.
					</>
				),
				duration: 0,
				placement: 'top',
			})
		},
		onError: error => {
			const res = error.response?.data
			const customMsg =
				res?.message ||
				res?.data?.errors?.username?.[0] ||
				res?.data?.errors?.password?.[0] ||
				'❌ Nomaʼlum xatolik yuz berdi'

			message.error(customMsg)
		},
	})

	const verifyMutation = useMutation({
		mutationFn: data => api.post('/user/student-verify/', data),
		onSuccess: res => {
			if (res.data?.status_code === 200) {
				message.success(
					'✅ Tasdiqlash muvaffaqiyatli. Endi tizimga kiring.'
				)
				history.push('/login')
			} else {
				message.error(res.data?.message || 'Noma’lum xatolik.')
			}
		},
		onError: error => {
			const res = error.response?.data
			const customMsg =
				res?.data?.message ||
				res?.data?.errors?.username?.[0] ||
				res?.data?.errors?.verification_code?.[0] ||
				'❌ Nomaʼlum xatolik yuz berdi'

			message.error(customMsg)
		},
	})

	return (
		<Row style={{ minHeight: '100vh' }}>
			<Col
				xs={24}
				lg={12}
				className='bg-white flex items-center justify-center'
			>
				<div style={{ width: '100%', maxWidth: 400 }}>
					<Title className='text-center' level={2}>
						Ro'yhatdan o'tish
					</Title>
					<Form
						form={form}
						layout='vertical'
						onFinish={values => {
							if (step === 'create') {
								if (!verificationRequested) {
									createMutation.mutate(values)
								} else {
									setStep('verify')
								}
							} else {
								verifyMutation.mutate({
									username,
									verification_code: values.verification_code,
								})
							}
						}}
					>
						{step === 'create' ? (
							<>
								<Form.Item
									name='username'
									label='Telefon raqamingiz'
									rules={[
										{
											required: true,
											message:
												'Telefon raqamingizni kiriting',
										},
										{
											pattern: /^\+998\d{9}$/,
											message:
												'Raqam +998 bilan boshlanib, jami 13 ta belgidan iborat bo‘lishi kerak',
										},
									]}
								>
									<Input
										prefix={<UserOutlined />}
										placeholder='+998...'
									/>
								</Form.Item>
								<Form.Item
									name='password'
									label='Parol'
									rules={[
										{
											required: true,
											message: 'Parol yarating',
										},
									]}
								>
									<Input.Password
										prefix={<LockOutlined />}
										placeholder='Parol'
									/>
								</Form.Item>
							</>
						) : (
							<Form.Item
								name='verification_code'
								label='Tasdiqlash kodi'
								rules={[
									{
										required: true,
										message: 'SMS kodni kiriting',
									},
								]}
							>
								<Input placeholder='123456' />
							</Form.Item>
						)}
						<Form.Item>
							<Button
								className='bg-blue-500 text-white'
								size='large'
								type='primary'
								htmlType='submit'
								block
								loading={
									createMutation.isPending ||
									verifyMutation.isPending
								}
							>
								{step === 'create'
									? verificationRequested
										? 'Tasdiqlash kodini olish'
										: 'Ro‘yxatdan o‘tish'
									: 'Tasdiqlash'}
							</Button>
						</Form.Item>
						{step === 'create' ? (
							<Text className='flex justify-center gap-2'>
								Allaqachon akkauntingiz bormi?{' '}
								<Link href='#/login'> Tizimga kirish</Link>
							</Text>
						) : (
							<Text type='secondary'>
								SMS kodni @raqamli_insitut_bot orqali oling va
								tasdiqlang.
							</Text>
						)}
					</Form>
				</div>
			</Col>
			<Col
				xs={24}
				lg={12}
				className='bg-blue-600 text-white flex flex-col justify-center items-center p-8'
			>
				<SignUpAnimation />
				<p className='text-3xl font-bold mb-4'>Ro‘yxatdan o‘tish</p>
				<Text className='text-white' style={{ fontSize: 18 }}>
					Iltimos, maʼlumotlaringizni to‘ldiring va SMS tasdiqlang.
				</Text>
			</Col>
		</Row>
	)
}
