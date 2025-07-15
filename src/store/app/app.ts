import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getLocalStorage, setLocalStorage } from '../../lib/utils/storage'
import { type IAppStore } from '../../types/app'
import { COLLAPSED } from '../../utils/general'
import { history } from '../../utils/history'
import { createSelectors } from '../createSelectors'

const initialState = {
	isInitiated: false,
	isModal: false,
	search: '',
	imageId: 0,
	fileList: [],
	location: history.location,
	collapsed: getLocalStorage(COLLAPSED),
	previewImage: '',
	previewTitle: '',
	language: getLocalStorage('language') || 'uz',
}

const useAppBase = create<IAppStore>()(
	devtools(set => ({
		...initialState,

		setTheme: theme =>
			set(state => {
				setLocalStorage(THEME, theme)

				return {
					...state,
					theme,
				}
			}),
		setSearch: search => set(() => ({ search })),
		setImageId: imageId => set(() => ({ imageId })),
		setHistory: ({ action, location }) => set(() => ({ action, location })),
		setIsModal: isModal => set(() => ({ isModal })),
		setFileList: fileList => set(() => ({ fileList })),
		setCollapsed: collapsed =>
			set(state => {
				setLocalStorage(COLLAPSED, collapsed)
				return { ...state, collapsed }
			}),
		setPreviewImage: previewImage => set(() => ({ previewImage })),
		setPreviewTitle: previewTitle => set(() => ({ previewTitle })),

		setLanguage: language => set(() => ({ language })),
	}))
)

export const useAppStore = createSelectors(useAppBase)
