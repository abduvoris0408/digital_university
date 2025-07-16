import type React from 'react'

import {
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	PlusOutlined,
	SearchOutlined,
} from '@ant-design/icons'
import {
	Button,
	Col,
	Input,
	Modal,
	Popconfirm,
	Row,
	Space,
	Table,
	Typography,
} from 'antd'
import { debounce } from 'lodash-es'
import { useCallback, useState } from 'react'
import { useDeleteRole, useRoles } from '../../lib/query/useRoles'
import type { Role } from '../../types/role'
import RoleForm from './components/RoleForm'

const { Title } = Typography

type ModalMode = 'create' | 'edit' | 'view'

export const UserPermissions: React.FC = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [modalMode, setModalMode] = useState<ModalMode>('create')
	const [selectedRoleGuid, setSelectedRoleGuid] = useState<
		string | undefined
	>()
	const [searchTerm, setSearchTerm] = useState('')

	const { data: roles = [], isLoading, refetch } = useRoles(searchTerm)
	const deleteRoleMutation = useDeleteRole()

	const debouncedSearch = useCallback(
		debounce((value: string) => setSearchTerm(value), 500),
		[]
	)

	const handleSearch = (value: string) => debouncedSearch(value)

	const handleCreate = () => {
		setModalMode('create')
		setSelectedRoleGuid(undefined)
		setIsModalVisible(true)
	}

	const handleEdit = (roleGuid: string) => {
		setModalMode('edit')
		setSelectedRoleGuid(roleGuid)
		setIsModalVisible(true)
	}

	const handleView = (roleGuid: string) => {
		setModalMode('view')
		setSelectedRoleGuid(roleGuid)
		setIsModalVisible(true)
	}

	const handleDelete = async (roleGuid: string) => {
		try {
			await deleteRoleMutation.mutateAsync(roleGuid)
			refetch()
		} catch {}
	}

	const handleModalClose = () => {
		setIsModalVisible(false)
		setSelectedRoleGuid(undefined)
		setModalMode('create')
		refetch()
	}

	const getModalTitle = () => {
		switch (modalMode) {
			case 'create':
				return "Yangi rol qo'shish"
			case 'edit':
				return 'Rolni tahrirlash'
			case 'view':
				return "Rol ma'lumotlari"
			default:
				return "Yangi rol qo'shish"
		}
	}

	const columns = [
		{
			title: 'Nomi',
			dataIndex: 'name',
			key: 'name',
			render: (name: any) => <>{name?.uz || '—'}</>,
			sorter: (a: Role, b: Role) =>
				(a.name?.uz || '').localeCompare(b.name?.uz || ''),
		},
		{
			title: 'Tavsif',
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
			render: (text: string) => text || '—',
		},
		{
			title: 'Amallar',
			key: 'actions',
			width: 150,
			render: (_: any, record: Role) => (
				<Space size='small'>
					<Button
						type='text'
						icon={<EyeOutlined />}
						onClick={() => handleView(record.guid!)}
						title="Ko'rish"
						style={{ color: '#1890ff' }}
					/>
					<Button
						type='text'
						icon={<EditOutlined />}
						onClick={() => handleEdit(record.guid!)}
						title='Tahrirlash'
						style={{ color: '#1dba1a' }}
					/>
					<Popconfirm
						title="Rolni o'chirish"
						description="Haqiqatan ham bu rolni o'chirmoqchimisiz?"
						onConfirm={() => handleDelete(record.guid!)}
						okText='Ha'
						okType='danger'
						cancelText="Yo'q"
						placement='topRight'
					>
						<Button
							type='text'
							danger
							icon={<DeleteOutlined />}
							title="O'chirish"
							style={{ color: '#ff4d4f' }}
						/>
					</Popconfirm>
				</Space>
			),
		},
	]

	return (
		<div className='p-4'>
			<Row
				justify='space-between'
				align='middle'
				style={{ marginBottom: 24 }}
			>
				<Col>
					<Title level={3} style={{ margin: 0 }}>
						Foydalanuvchi rollari
					</Title>
				</Col>
				<Col>
					<Button
						className='bg-blue-500'
						type='primary'
						icon={<PlusOutlined />}
						onClick={handleCreate}
						size='large'
					>
						Yangi rol qo'shish
					</Button>
				</Col>
			</Row>
			<Row style={{ marginBottom: 16 }}>
				<Col span={8}>
					<Input
						placeholder='Rollarni qidirish...'
						prefix={<SearchOutlined />}
						onChange={e => handleSearch(e.target.value)}
						allowClear
						size='large'
						style={{ borderRadius: '8px' }}
					/>
				</Col>
			</Row>
			<Table
				className='bg-white p-2'
				columns={columns}
				dataSource={Array.isArray(roles) ? roles : []}
				loading={isLoading}
				rowKey='guid'
				pagination={{
					pageSize: 10,
					showSizeChanger: true,
					showQuickJumper: true,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} / ${total} ta yozuv`,
					pageSizeOptions: ['10', '20', '50', '100'],
				}}
				scroll={{ x: 800 }}
				size='middle'
				style={{ borderRadius: '8px' }}
			/>
			<Modal
				title={
					<div style={{ fontSize: '18px', fontWeight: 600 }}>
						{getModalTitle()}
					</div>
				}
				open={isModalVisible}
				onCancel={handleModalClose}
				footer={null}
				width={900}
				destroyOnClose
				centered
			>
				<RoleForm
					roleGuid={selectedRoleGuid}
					mode={modalMode}
					onSuccess={handleModalClose}
					onCancel={handleModalClose}
				/>
			</Modal>
		</div>
	)
}
