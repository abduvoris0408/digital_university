import { message } from 'antd'

export const successMessage = (content: string) => {
	message.success({
		content,
		duration: 2,
	})
}

export const errorMessage = (content: string) => {
	message.error({
		content,
		duration: 2,
	})
}

export const warningMessage = (content: string) => {
	message.warning({
		content,
		duration: 2,
	})
}
