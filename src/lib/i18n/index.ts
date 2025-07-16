import i18n from 'i18next'

import detector from 'i18next-browser-languagedetector'
import backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
i18n.use(initReactI18next)
	.use(backend)
	.use(detector)
	.init({
		ns: ['auth', 'dashboard', 'course', 'certificate', 'notifications'],
		supportedLngs: ['ru', 'en', 'uz'],
		backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
		fallbackLng: 'uz',
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['cookie', 'localStorage'],
			caches: ['cookie', 'localStorage'],
			lookupLocalStorage: 'language',
		},
		react: {
			useSuspense: false,
		},
	})

export { i18n }
