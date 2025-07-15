import { Empty } from 'antd'

export const NotFound = () => {
	return (
		<Box
			style={{ minHeight: 'inherit', flex: 1 }}
			$justify='center'
			$m='20px 0'
			$align='center'
		>
			<Empty description="Ma'lumot topilmadi, ortga qaytish">
				<Button
					label='ortga qaytish'
					type='primary'
					onClick={() => history.back()}
				/>
			</Empty>
		</Box>
	)
}
