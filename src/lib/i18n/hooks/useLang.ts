import { useTranslation } from 'react-i18next'

export const useChangeLang = () => {
	const { i18n } = useTranslation()

	return { change: i18n.changeLanguage }
}
