export const ACCESS_TOKEN = 'accessToken'
export const REFRESH_TOKEN = 'refreshToken'
export const USER = 'user'
export const THEME = 'theme'
export const COLLAPSED = 'collapsed'
export const getShortLang = (lng: string): string => {
	return lng.slice(0, 2).toUpperCase()
}
