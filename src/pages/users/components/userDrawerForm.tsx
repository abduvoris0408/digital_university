// import { Button, DatePicker, Drawer, Form, Input, Select, Space } from 'antd'
// import dayjs from 'dayjs'
// import { useEffect } from 'react'
// import type { IUser } from '../../../types/user'

// type Props = {
// 	open: boolean
// 	onClose: () => void
// 	onSubmit: (values: any) => void
// 	initialValues?: IUser | null
// 	loading?: boolean
// }

// export const UserDrawerForm = ({
// 	open,
// 	onClose,
// 	onSubmit,
// 	initialValues,
// 	loading,
// }: Props) => {
// 	const [form] = Form.useForm()

// 	useEffect(() => {
// 		if (initialValues) {
// 			form.setFieldsValue({
// 				...initialValues,
// 				birthday: dayjs(initialValues.birthday),
// 				role: initialValues.role?.map(r => r.id),
// 			})
// 		} else {
// 			form.resetFields()
// 		}
// 	}, [initialValues, form])

// 	const handleFinish = (values: any) => {
// 		const payload = {
// 			...values,
// 			birthday: values.birthday.format('YYYY-MM-DD'),
// 		}
// 		onSubmit(payload)
// 	}

// 	return (
// 		<Drawer
// 			title={
// 				initialValues
// 					? 'Foydalanuvchini tahrirlash'
// 					: 'Yangi foydalanuvchi'
// 			}
// 			width={480}
// 			onClose={onClose}
// 			open={open}
// 			destroyOnClose
// 		>
// 			<Form layout='vertical' form={form} onFinish={handleFinish}>
// 				<Form.Item label='Ism' name='name' rules={[{ required: true }]}>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item label='Familiya' name='surname'>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item label='Sharif' name='middle_name'>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item label='Telefon' name='phone_number'>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item label='Tug‘ilgan sana' name='birthday'>
// 					<DatePicker format='YYYY-MM-DD' style={{ width: '100%' }} />
// 				</Form.Item>
// 				<Form.Item label='Username' name='username'>
// 					<Input />
// 				</Form.Item>
// 				<Form.Item label='Role' name='role'>
// 					<Select mode='multiple' options={[]} />
// 				</Form.Item>

// 				<Form.Item>
// 					<Space>
// 						<Button onClick={onClose}>Bekor qilish</Button>
// 						<Button
// 							className='bg-blue-500'
// 							type='primary'
// 							htmlType='submit'
// 							loading={loading}
// 						>
// 							Saqlash
// 						</Button>
// 					</Space>
// 				</Form.Item>
// 			</Form>
// 		</Drawer>
// 	)
// }

import { Button, DatePicker, Drawer, Form, Input, Select, Space } from 'antd'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useRoles } from '../../../lib/query/useRoles'
import type { IUser } from '../../../types/user'

type Props = {
	open: boolean
	onClose: () => void
	onSubmit: (values: any) => void
	initialValues?: IUser | null
	loading?: boolean
	viewMode?: boolean
}

export const UserDrawerForm = ({
	open,
	onClose,
	onSubmit,
	initialValues,
	loading,
	viewMode = false,
}: Props) => {
	const [form] = Form.useForm()
	const { data: rolesData, isLoading: isRoleLoading } = useRoles()

	useEffect(() => {
		if (initialValues) {
			form.setFieldsValue({
				...initialValues,
				birthday: dayjs(initialValues.birthday, 'DD.MM.YYYY'),
				role: initialValues.role?.map(r => r.id),
			})
		} else {
			form.resetFields()
		}
	}, [initialValues, form])

	const handleFinish = (values: any) => {
		const payload = {
			...values,
			birthday: values.birthday.format('DD.MM.YYYY'),
		}
		onSubmit(payload)
	}

	return (
		<Drawer
			title={
				initialValues
					? viewMode
						? 'Foydalanuvchi tafsilotlari'
						: 'Foydalanuvchini tahrirlash'
					: 'Yangi foydalanuvchi'
			}
			width={480}
			onClose={onClose}
			open={open}
			destroyOnClose
		>
			<Form layout='vertical' form={form} onFinish={handleFinish}>
				<Form.Item label='Ism' name='name' rules={[{ required: true }]}>
					<Input disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Familiya' name='surname'>
					<Input disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Sharif' name='middle_name'>
					<Input disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Username' name='username'>
					<Input disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Telefon 1' name='phone_number'>
					<Input disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Telefon 2' name='phone_number_2'>
					<Input disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Tug‘ilgan sana' name='birthday'>
					<DatePicker
						format='DD.MM.YYYY'
						style={{ width: '100%' }}
						disabled={viewMode}
					/>
				</Form.Item>

				<Form.Item label='Manzili: Mamlakat' name='country'>
					<Select
						disabled={viewMode}
						options={[
							{ label: "O'zbekiston", value: '1' },
							// boshqalar kerak bo‘lsa dinamik qo‘shiladi
						]}
					/>
				</Form.Item>

				<Form.Item label='Viloyat' name='region'>
					<Select disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Tuman' name='district'>
					<Select disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Mahalla' name='quarter'>
					<Select disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Jinsi' name='gender'>
					<Select
						disabled={viewMode}
						options={[
							{ label: 'Erkak', value: 1 },
							{ label: 'Ayol', value: 2 },
						]}
					/>
				</Form.Item>

				<Form.Item label='Rol' name='role'>
					<Select
						mode='multiple'
						disabled={viewMode}
						options={
							rolesData?.map(role => ({
								value: role.id,
								label:
									typeof role.name === 'object'
										? role.name.uz
										: role.name,
							})) || []
						}
					/>
				</Form.Item>

				<Form.Item label='Foydalanuvchi turi' name='user_type'>
					<Select
						disabled={viewMode}
						options={[
							{ label: 'Tinglovchi', value: 'STUDENT' },
							{ label: 'Admin', value: 'ADMIN' },
						]}
					/>
				</Form.Item>

				<Form.Item label='Kasbi' name='profession'>
					<Input disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Passport seria' name='passport_seria'>
					<Input disabled={viewMode} />
				</Form.Item>

				<Form.Item label='Passport raqami' name='passport_number'>
					<Input disabled={viewMode} type='number' />
				</Form.Item>

				<Form.Item label='Passport ma’lumot' name='passport_data'>
					<Input disabled={viewMode} />
				</Form.Item>

				{/* Parol faqat yangi foydalanuvchi qo‘shilganda kerak */}
				{!initialValues && (
					<Form.Item
						label='Parol'
						name='password'
						rules={[
							{ required: true, message: 'Parolni kiriting' },
						]}
					>
						<Input.Password disabled={viewMode} />
					</Form.Item>
				)}

				{!viewMode && (
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
				)}
			</Form>
		</Drawer>
	)
}
