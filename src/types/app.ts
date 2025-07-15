import type { UploadFile } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'

import type { Action } from 'history'

export interface IAppStore {
	search: string
	isModal: boolean
	imageId: number
	fileList: UploadFile[]
	location: Location
	collapsed: boolean
	previewImage: string
	previewTitle: string
	language: TLanguages

	setSearch: (search: string) => void
	setHistory: ({ action, location }: THistory) => void
	setImageId: (imageId: number) => void
	setIsModal: (isModal: boolean) => void
	setFileList: (fileList: UploadFile[]) => void
	setCollapsed: (collapsed: boolean) => void
	setPreviewImage: (image: string) => void
	setPreviewTitle: (title: string) => void
	setLanguage: (lng: TLanguages) => void
}

export type THistory = {
	action: Action
	location: Location
}

export type TParams = number | string | undefined | any

export type TLanguages = 'uz' | 'ru' | 'en'

export type RangePickerValue = RangePickerProps['value']

export type TimeType = 'today' | 'week' | 'month' | 'year'

export type TSortOrder = 'ASC' | 'DESC'

export type TStringOrNull = string | null

export type TNumberOrNull = number | null

export type TReqParams = {
	page?: number
	limit?: number
	sortBy?: string
	search?: string
	sortOrder: TSortOrder
	region?: TSortOrder
} & Record<string, string | number | TSortOrder | undefined>

export type THandleDeleteFunc = (id: string) => void

export type TDataWithLangs = {
	en: string
	ru: string
	uz: string
}

export type TQuizStore = {
	idChekedFromRequest: number
	multipleIdChecked: number[]
	isTeacher: boolean
	setIdChekedFromRequest: (id: number) => void
	setMultipleIdChecked: (id: number[]) => void
	setQuizIsTeacher: (isTeacher: boolean) => void
}
export type TError = { error: string; message: string; statusCode: number }
