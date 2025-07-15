import { Flex, Spin } from 'antd'

export const Loading = () => {
	return (
		<Flex
			align='center'
			justify='center'
			vertical
			style={{
				height: '100vh',
				width: '100vw',
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 9999,
				backgroundColor: 'white',
			}}
			id='loader'
		>
			<Spin size='large' />
		</Flex>
	)
}
