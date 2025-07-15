import { Button, Form, Input, InputNumber, Switch } from 'antd'
import type { FC } from 'react'

type CertificateFormValues = {
	groups: number
	user: number
	description: string
	text_font_size: number
	bottom_font_size: number
	is_mediator: boolean
	academic_hour: number
	director_name: string
}

type Props = {
	onFinish: (values: CertificateFormValues) => void
	isLoading?: boolean
	initialValues?: Partial<CertificateFormValues>
}

export const CertificateForm: FC<Props> = ({
	onFinish,
	isLoading = false,
	initialValues,
}) => {
	const [form] = Form.useForm<CertificateFormValues>()

	return (
		<Form
			form={form}
			layout='vertical'
			onFinish={onFinish}
			initialValues={initialValues}
		>
			<Form.Item
				label='Group ID'
				name='groups'
				rules={[{ required: true, message: 'Group ID is required' }]}
			>
				<InputNumber style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				label='User ID'
				name='user'
				rules={[{ required: true, message: 'User ID is required' }]}
			>
				<InputNumber style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				label='Description'
				name='description'
				rules={[{ required: true, message: 'Description is required' }]}
			>
				<Input.TextArea rows={3} />
			</Form.Item>

			<Form.Item
				label='Text Font Size'
				name='text_font_size'
				rules={[
					{ required: true, message: 'Text font size is required' },
				]}
			>
				<InputNumber style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				label='Bottom Font Size'
				name='bottom_font_size'
				rules={[
					{ required: true, message: 'Bottom font size is required' },
				]}
			>
				<InputNumber style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				label='Academic Hour'
				name='academic_hour'
				rules={[
					{ required: true, message: 'Academic hour is required' },
				]}
			>
				<InputNumber style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				label='Director Name'
				name='director_name'
				rules={[
					{ required: true, message: 'Director name is required' },
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='Is Mediator'
				name='is_mediator'
				valuePropName='checked'
				rules={[{ required: true, message: 'Is mediator is required' }]}
			>
				<Switch />
			</Form.Item>

			<Form.Item>
				<Button
					className='bg-blue-500'
					type='primary'
					htmlType='submit'
					loading={isLoading}
					block
				>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}
