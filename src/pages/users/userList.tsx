import { Button, Card, Popconfirm, Space, Table, Tag, Typography } from 'antd'
import { useState } from 'react'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import {
	useCreateUser,
	useDeleteUser,
	useUpdateUser,
	useUsers,
} from '../../lib/query/useUsers'
import type { IUser } from '../../types/user'
import { UserDrawerForm } from './components/userDrawerForm'

const { Title } = Typography

export const UserList = () => {
	const { data: users, isLoading } = useUsers()
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [editingUser, setEditingUser] = useState<IUser | null>(null)

	const createUser = useCreateUser()
	const updateUser = useUpdateUser(editingUser?.guid || '')
	const deleteUser = useDeleteUser()

	const handleEdit = (user: IUser) => {
		setEditingUser(user)
		setDrawerOpen(true)
	}

	const handleDelete = (guid: string) => {
		deleteUser.mutate(guid)
	}

	const handleSubmit = (data: any) => {
		if (editingUser) {
			updateUser.mutate(data, {
				onSuccess: () => setDrawerOpen(false),
			})
		} else {
			createUser.mutate(data, {
				onSuccess: () => setDrawerOpen(false),
			})
		}
	}

	const columns = [
		{
			title: 'Ism',
			dataIndex: 'name',
		},
		{
			title: 'Familiya',
			dataIndex: 'surname',
		},
		{
			title: 'Telefon',
			dataIndex: 'phone_number',
		},
		{
			title: 'Username',
			dataIndex: 'username',
		},
		{
			title: 'Viloyat',
			dataIndex: 'region_name',
			render: (region: any) => region?.name_uz || '—', // agar object bo‘lsa
		},
		{
			title: 'Role',
			dataIndex: 'role',
			render: (roles: IUser['role']) => (
				<Space>
					{roles?.map(role => (
						<Tag key={role.id}>
							{typeof role.name === 'object'
								? role.name.uz
								: role.name || '—'}
						</Tag>
					))}
				</Space>
			),
		},
		{
			title: 'Amallar',
			render: (_: any, row: IUser) => (
				<Space>
					<Button
						type='link'
						icon={<EditOutlined />}
						onClick={() => handleEdit(row)}
					/>
					<Popconfirm
						title='Foydalanuvchini o‘chirishni tasdiqlaysizmi?'
						onConfirm={() => handleDelete(row.guid)}
					>
						<Button type='link' icon={<DeleteOutlined />} danger />
					</Popconfirm>
				</Space>
			),
		},
	]

	return (
		<div style={{ padding: 16 }}>
			<div className='flex items-center justify-between pt-2 pb-4'>
				<Title level={3}>Foydalanuvchilar ro‘yxati</Title>
				<Button
					className='bg-blue-500'
					type='primary'
					icon={<PlusOutlined />}
					onClick={() => {
						setEditingUser(null)
						setDrawerOpen(true)
					}}
				>
					Yangi foydalanuvchi
				</Button>
			</div>
			<Card>
				<Table
					loading={isLoading}
					dataSource={Array.isArray(users?.data) ? users.data : []}
					columns={columns}
					rowKey='guid'
				/>
			</Card>

			<UserDrawerForm
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				initialValues={editingUser}
				onSubmit={handleSubmit}
				loading={createUser.isPending || updateUser.isPending}
			/>
		</div>
	)
}
