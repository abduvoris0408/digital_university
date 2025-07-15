import { UserOutlined } from '@ant-design/icons'
import { Avatar, Flex, message, Modal, Spin, Tag } from 'antd'
import { useTheme } from 'antd-style'

import { CustomDropdown } from '../../../components/dropdown'
import { Text } from '../../../components/text'
import { useGetOneData } from '../../../lib/query/userdata'
import { useAuthStore } from '../../../store'
import type { IUser } from '../../../types/user'
import { history } from '../../../utils/history'
import { profileModalMenu } from '../constants'

const { confirm } = Modal

export const ProfileDropdown = () => {
	const { colorPrimary } = useTheme()
	const logout = useAuthStore(state => state.logout)
	const [messageApi, contextHolder] = message.useMessage()

	const { data: user, isLoading } = useGetOneData<IUser[]>({
		queryKey: ['base-me'],
		url: '/base/me/',
	})

	const handleLogout = () => {
		confirm({
			title: 'Tizimdan chiqishni xohlaysizmi?',
			okText: 'Chiqish',
			okType: 'danger',
			cancelText: 'Bekor qilish',
			onOk: () => {
				logout()
				messageApi.success('Tizimdan chiqdingiz')
				history.push('/login')
			},
		})
	}

	const handleProfile = () => {
		history.push('/profile')
	}

	const userInfo = Array.isArray(user) ? user[0] : null

	const getFullName = () => {
		if (!userInfo) return ''
		const parts = [
			userInfo.name,
			userInfo.middle_name,
			userInfo.surname,
		].filter(Boolean)
		return parts.length > 0 ? parts.join(' ') : userInfo.username
	}

	const roleText = Array.isArray(userInfo?.role)
		? userInfo.role.map(r => r.name?.uz || r.name).join(', ')
		: '—'

	if (isLoading) {
		return (
			<Flex align='center' justify='center' style={{ padding: '0 12px' }}>
				<Spin size='small' />
			</Flex>
		)
	}

	return (
		<>
			{contextHolder}
			<CustomDropdown
				menu={{
					items: profileModalMenu({
						onClicks: [handleProfile, handleLogout],
					}),
				}}
				trigger={['hover']}
				overlayStyle={{ width: 250 }}
				forceRender
			>
				<Flex
					gap='small'
					align='center'
					style={{ marginLeft: 10, cursor: 'pointer' }}
				>
					<Avatar
						size={42}
						src={userInfo?.photo}
						icon={<UserOutlined />}
						style={{ backgroundColor: colorPrimary }}
					/>
					<Flex vertical>
						<Text>{getFullName()}</Text>
						<Tag color='green'>{roleText}</Tag>
					</Flex>
				</Flex>
			</CustomDropdown>
		</>
	)
}
