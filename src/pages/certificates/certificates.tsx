import {
	Button,
	Drawer,
	Popconfirm,
	Space,
	Table,
	Typography,
	message,
} from 'antd'
import { useState } from 'react'
import {
	useCreateCertificate,
	useDeleteCertificate,
	useGetCertificates,
	useUpdateCertificate,
} from '../../lib/query/useCertificates'
import type { Certificate } from '../../types/certificate'
import { CertificateForm } from './components/CertificateForm'

const { Title } = Typography

export const Certificates = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [editingItem, setEditingItem] = useState<Certificate | null>(null)

	const { data = [], isLoading } = useGetCertificates()
	const createCertificate = useCreateCertificate()
	const updateCertificate = useUpdateCertificate()
	const deleteCertificate = useDeleteCertificate()

	const openDrawer = (item?: Certificate) => {
		setEditingItem(item || null)
		setIsDrawerOpen(true)
	}

	const closeDrawer = () => {
		setEditingItem(null)
		setIsDrawerOpen(false)
	}

	const handleDelete = (guid: string) => {
		deleteCertificate.mutate(guid, {
			onSuccess: () => {
				message.success('Sertifikat o‘chirildi')
			},
		})
	}

	const handleSubmit = (values: Partial<Certificate>) => {
		if (editingItem?.guid) {
			updateCertificate.mutate(
				{ guid: editingItem.guid, body: values },
				{
					onSuccess: () => {
						message.success('Sertifikat tahrirlandi')
						closeDrawer()
					},
				}
			)
		} else {
			createCertificate.mutate(values, {
				onSuccess: () => {
					message.success('Sertifikat qo‘shildi')
					closeDrawer()
				},
			})
		}
	}

	const columns = [
		{
			title: 'F.I.Sh.',
			dataIndex: 'user',
			key: 'fullName',
			render: (user: Certificate['user']) =>
				`${user?.surname || ''} ${user?.name || ''} ${
					user?.middle_name || ''
				}`,
		},
		{
			title: 'Telefon',
			dataIndex: ['user', 'phone_number'],
		},
		{
			title: 'Guruh',
			dataIndex: ['groups', 'title'],
		},
		{
			title: 'Akademik soat',
			dataIndex: 'academic_hour',
		},
		{
			title: 'Amallar',
			key: 'actions',
			render: (_: any, record: Certificate) => (
				<Space>
					<Button type='link' onClick={() => openDrawer(record)}>
						Tahrirlash
					</Button>
					<Popconfirm
						title='Rostdan ham o‘chirmoqchimisiz?'
						onConfirm={() => handleDelete(record.guid)}
					>
						<Button danger type='link'>
							O‘chirish
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	]

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between'>
				<Title level={4}>Sertifikatlar</Title>
				<Button
					className='bg-blue-500'
					type='primary'
					onClick={() => openDrawer()}
					style={{ marginBottom: 16 }}
				>
					Sertifikat qo‘shish
				</Button>
			</div>
			<Table
				rowKey='guid'
				loading={isLoading}
				columns={columns}
				dataSource={Array.isArray(data) ? data : []}
			/>
			<Drawer
				open={isDrawerOpen}
				onClose={closeDrawer}
				title='Create Certificate'
				width={480}
			>
				<CertificateForm
					onFinish={handleSubmit}
					isLoading={createCertificate.isPending}
				/>
			</Drawer>
		</div>
	)
}
