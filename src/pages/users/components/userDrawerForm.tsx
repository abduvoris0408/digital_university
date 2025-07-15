import { Button, DatePicker, Drawer, Form, Input, Select, Space } from 'antd'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import type { IUser } from '../../../types/user'

type Props = {
	open: boolean
	onClose: () => void
	onSubmit: (values: any) => void
	initialValues?: IUser | null
	loading?: boolean
}

export const UserDrawerForm = ({
	open,
	onClose,
	onSubmit,
	initialValues,
	loading,
}: Props) => {
	const [form] = Form.useForm()

	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue({
				...initialValues,
				birthday: dayjs(initialValues.birthday),
				role: initialValues.role?.map(r => r.id),
			})
		} else {
			form.resetFields()
		}
	}, [initialValues, form])

	const handleFinish = (values: any) => {
		const payload = {
			...values,
			birthday: values.birthday.format('YYYY-MM-DD'),
		}
		onSubmit(payload)
	}

	return (
		<Drawer
			title={
				initialValues
					? 'Foydalanuvchini tahrirlash'
					: 'Yangi foydalanuvchi'
			}
			width={480}
			onClose={onClose}
			open={open}
			destroyOnClose
		>
			<Form layout='vertical' form={form} onFinish={handleFinish}>
				<Form.Item label='Ism' name='name' rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item label='Familiya' name='surname'>
					<Input />
				</Form.Item>
				<Form.Item label='Sharif' name='middle_name'>
					<Input />
				</Form.Item>
				<Form.Item label='Telefon' name='phone_number'>
					<Input />
				</Form.Item>
				<Form.Item label='Tug‘ilgan sana' name='birthday'>
					<DatePicker format='YYYY-MM-DD' style={{ width: '100%' }} />
				</Form.Item>
				<Form.Item label='Username' name='username'>
					<Input />
				</Form.Item>
				<Form.Item label='Role' name='role'>
					<Select mode='multiple' options={[]} />
				</Form.Item>

				<Form.Item>
					<Space>
						<Button onClick={onClose}>Bekor qilish</Button>
						<Button
							className='bg-blue-500'
							type='primary'
							htmlType='submit'
							loading={loading}
						>
							Saqlash
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</Drawer>
	)
}
