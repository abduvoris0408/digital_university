import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import {
	Button,
	Card,
	Checkbox,
	Col,
	Divider,
	Empty,
	Form,
	Input,
	message,
	Row,
	Space,
	Spin,
	Typography,
} from 'antd'
import { debounce } from 'lodash-es'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'

import {
	useCreateRole,
	usePermissions,
	useRole,
	useUpdateRole,
} from '../../../lib/query/useRoles'
import type { CreateRoleRequest, Permission } from '../../../types/role'

const { Title, Text } = Typography
const { TextArea } = Input

interface RoleFormProps {
	roleGuid?: string
	mode: 'create' | 'edit' | 'view'
	onSuccess?: () => void
	onCancel?: () => void
}

const RoleForm: React.FC<RoleFormProps> = ({
	roleGuid,
	mode,
	onSuccess,
	onCancel,
}) => {
	const [form] = Form.useForm()
	const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
	const [permissionSearch, setPermissionSearch] = useState('')
	const [selectAll, setSelectAll] = useState(false)

	const isViewing = mode === 'view'
	const isEditing = mode === 'edit'
	const isCreating = mode === 'create'

	const { data: permissionsData, isLoading: permissionsLoading } =
		usePermissions(permissionSearch)
	const permissions: Permission[] = Array.isArray(permissionsData)
		? permissionsData
		: []

	const {
		data: roleData,
		isLoading: roleLoading,
		error: roleError,
	} = useRole(roleGuid || '')
	const createRoleMutation = useCreateRole()
	const updateRoleMutation = useUpdateRole()

	const isLoading = permissionsLoading || roleLoading
	const isSubmitting =
		createRoleMutation.isPending || updateRoleMutation.isPending

	const debouncedPermissionSearch = useCallback(
		debounce((value: string) => {
			setPermissionSearch(value)
		}, 300),
		[]
	)

	const handlePermissionSearch = (value: string) => {
		debouncedPermissionSearch(value)
	}

	const groupedPermissions = permissions.reduce((acc, permission) => {
		const key = permission.content_type.model
		if (!acc[key]) {
			acc[key] = []
		}
		acc[key].push(permission)
		return acc
	}, {} as Record<string, Permission[]>)

	// Load role data when editing or viewing
	useEffect(() => {
		if (roleData && (isEditing || isViewing)) {
			// Handle different possible data structures
			const roleName = roleData.data?.name || roleData.name
			const roleDescription =
				roleData.data?.description || roleData.description
			const rolePermissions =
				roleData.data?.permissions || roleData.permissions

			form.setFieldsValue({
				name: roleName?.uz || roleName || '',
				description: roleDescription || '',
			})

			setSelectedPermissions(
				Array.isArray(rolePermissions) ? rolePermissions : []
			)
		}
	}, [roleData, form, isEditing, isViewing])

	// Reset form when switching to create mode
	useEffect(() => {
		if (isCreating) {
			form.resetFields()
			setSelectedPermissions([])
		}
	}, [isCreating, form])

	useEffect(() => {
		const allPermissionIds = permissions.map(p => p.id)
		setSelectAll(
			allPermissionIds.length > 0 &&
				allPermissionIds.every(id => selectedPermissions.includes(id))
		)
	}, [permissions, selectedPermissions])

	const handlePermissionChange = (permissionId: number, checked: boolean) => {
		if (isViewing) return

		setSelectedPermissions(prev =>
			checked
				? [...prev, permissionId]
				: prev.filter(id => id !== permissionId)
		)
	}

	const handleSelectAll = (checked: boolean) => {
		if (isViewing) return

		if (checked) {
			const allPermissionIds = permissions.map(p => p.id)
			setSelectedPermissions(allPermissionIds)
		} else {
			setSelectedPermissions([])
		}
		setSelectAll(checked)
	}

	const onFinish = async (values: any) => {
		if (isViewing) return

		const roleData: CreateRoleRequest = {
			...values,
			permissions: selectedPermissions,
		}

		try {
			if (isEditing && roleGuid) {
				await updateRoleMutation.mutateAsync({
					guid: roleGuid,
					data: roleData,
				})
			} else {
				await createRoleMutation.mutateAsync(roleData)
			}
			onSuccess?.()
		} catch (error) {
			message.error('Form submission error:', error)
		}
	}

	const getPermissionActionName = (codename: string) => {
		if (codename.includes('add')) return "Qo'shish"
		if (codename.includes('change')) return "O'zgartirish"
		if (codename.includes('delete')) return "O'chirish"
		if (codename.includes('view')) return "Ko'rish"
		if (codename.includes('show')) return "Ko'rsatish"
		return codename
	}

	const getPermissionColor = (codename: string) => {
		if (codename.includes('add')) return '#52c41a'
		if (codename.includes('change')) return '#faad14'
		if (codename.includes('delete')) return '#ff4d4f'
		if (codename.includes('view')) return '#1890ff'
		if (codename.includes('show')) return '#722ed1'
		return '#666'
	}

	const getPermissionIcon = (codename: string) => {
		if (codename.includes('add')) return '+'
		if (codename.includes('change')) return '✎'
		if (codename.includes('delete')) return '🗑'
		if (codename.includes('view')) return '👁'
		if (codename.includes('show')) return '📋'
		return '•'
	}

	if (isLoading) {
		return (
			<div style={{ textAlign: 'center', padding: '50px' }}>
				<Spin size='large' />
				<div style={{ marginTop: 16 }}>
					{roleLoading && <div>Rol ma'lumotlari yuklanmoqda...</div>}
					{permissionsLoading && <div>Ruxsatlar yuklanmoqda...</div>}
				</div>
			</div>
		)
	}

	if (roleError && (isEditing || isViewing)) {
		return (
			<div style={{ textAlign: 'center', padding: '50px' }}>
				<div style={{ color: '#ff4d4f', marginBottom: 16 }}>
					Rol ma'lumotlarini yuklashda xatolik yuz berdi
				</div>
				<Button onClick={onCancel}>Yopish</Button>
			</div>
		)
	}

	return (
		<div>
			<Form
				form={form}
				layout='vertical'
				onFinish={onFinish}
				disabled={isSubmitting || isViewing}
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label='Nomi'
							name='name'
							rules={[
								{
									required: !isViewing,
									message: 'Rol nomini kiriting!',
								},
							]}
						>
							<Input
								placeholder='Rol nomini kiriting...'
								size='large'
								readOnly={isViewing}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label='Izohi' name='description'>
					<TextArea
						rows={4}
						placeholder='Tavsif kiriting...'
						readOnly={isViewing}
					/>
				</Form.Item>
				<Divider />
				<div style={{ marginBottom: 16 }}>
					<Title level={4} style={{ marginBottom: 16 }}>
						Ruxsatlar
					</Title>
					<Space
						direction='vertical'
						style={{ width: '100%', marginBottom: 20 }}
					>
						<Row justify='space-between' align='middle'>
							<Col>
								<Checkbox
									checked={selectAll}
									onChange={e =>
										handleSelectAll(e.target.checked)
									}
									disabled={isViewing}
									style={{
										fontSize: '16px',
										fontWeight: 500,
									}}
								>
									Barchasini tanlash
								</Checkbox>
							</Col>
							<Col>
								<Text type='secondary'>
									{selectedPermissions.length} /{' '}
									{permissions.length} tanlangan
								</Text>
							</Col>
						</Row>
						<Input
							placeholder='Ruxsatlarni izlash...'
							prefix={<SearchOutlined />}
							onChange={e =>
								handlePermissionSearch(e.target.value)
							}
							allowClear
							size='large'
							style={{ maxWidth: 400, borderRadius: '8px' }}
							disabled={isViewing}
						/>
					</Space>
					{permissions.length === 0 && permissionSearch && (
						<Empty
							description="Qidiruv bo'yicha hech narsa topilmadi"
							style={{ margin: '40px 0' }}
						/>
					)}
					{Object.entries(groupedPermissions).map(
						([model, modelPermissions]) => (
							<Card
								key={model}
								size='small'
								style={{
									marginBottom: 16,
									borderRadius: '8px',
								}}
								title={
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
										}}
									>
										<Text
											style={{
												fontSize: '16px',
												textTransform: 'capitalize',
											}}
										>
											{model}
										</Text>
										<Text
											type='secondary'
											style={{ fontSize: '12px' }}
										>
											{
												modelPermissions.filter(p =>
													selectedPermissions.includes(
														p.id
													)
												).length
											}{' '}
											/ {modelPermissions.length}{' '}
											tanlangan
										</Text>
									</div>
								}
							>
								<Row gutter={[12, 12]}>
									{modelPermissions.map(permission => (
										<Col
											key={permission.id}
											xs={24}
											sm={12}
											md={8}
											lg={6}
										>
											<Checkbox
												checked={selectedPermissions.includes(
													permission.id
												)}
												onChange={e =>
													handlePermissionChange(
														permission.id,
														e.target.checked
													)
												}
												disabled={isViewing}
												style={{ width: '100%' }}
											>
												<Space
													align='start'
													style={{ width: '100%' }}
												>
													<span
														style={{
															color: getPermissionColor(
																permission.codename
															),
															fontWeight: 500,
															fontSize: '14px',
														}}
													>
														{getPermissionIcon(
															permission.codename
														)}{' '}
														{getPermissionActionName(
															permission.codename
														)}
													</span>
												</Space>
											</Checkbox>
										</Col>
									))}
								</Row>
							</Card>
						)
					)}
				</div>
				{!isViewing && (
					<Form.Item style={{ marginTop: 32 }}>
						<Space size='large'>
							<Button
								className='bg-blue-500'
								type='primary'
								htmlType='submit'
								loading={isSubmitting}
								size='large'
								icon={<CheckOutlined />}
								style={{ minWidth: '120px' }}
							>
								{isEditing ? 'Yangilash' : 'Yuborish'}
							</Button>
							{onCancel && (
								<Button
									onClick={onCancel}
									size='large'
									icon={<CloseOutlined />}
									style={{ minWidth: '120px' }}
								>
									Bekor qilish
								</Button>
							)}
						</Space>
					</Form.Item>
				)}
				{isViewing && onCancel && (
					<Form.Item style={{ marginTop: 32 }}>
						<Button
							onClick={onCancel}
							size='large'
							style={{ minWidth: '120px' }}
						>
							Yopish
						</Button>
					</Form.Item>
				)}
			</Form>
		</div>
	)
}

export default RoleForm
