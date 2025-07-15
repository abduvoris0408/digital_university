import { useEffect, useState } from 'react'

export const useToken = () => {
	const [isAuth, setIsAuth] = useState(false)
	const [isInitiated, setIsInitiated] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem('accessToken')
		setIsAuth(!!token)
		setIsInitiated(true)
	}, [])

	return { isAuth, isInitiated }
}
