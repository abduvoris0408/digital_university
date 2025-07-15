import { useLocation } from 'react-router-dom'

export const usePathname = () => {
	const { pathname } = useLocation()

	return { decodedPathname: decodeURI(pathname), pathname }
}
