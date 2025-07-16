import { GlobalOutlined } from '@ant-design/icons'

import type { ItemType } from 'antd/es/menu/interface'
import { Button } from '../../../components/button/button'
import { CustomDropdown } from '../../../components/dropdown'
import { useMediaQuery } from '../../../components/hooks/useMediaQuery'
import { useChangeLang } from '../../../lib/i18n/hooks/useLang'
import { useAppStore } from '../../../store/app/app'
import type { TLanguages } from '../../../types/app'
import type { LanguageDropdownProps } from '../../type'
import { languageModalMenu } from '../constants'
export const LanguageDropdown = ({
	customBtn,
	isDrawer,
}: LanguageDropdownProps) => {
	const { setLanguage, language } = useAppStore()
	const { change } = useChangeLang()
	const { mobileLg, mobile, tablet } = useMediaQuery()

	const setLang = (lng: TLanguages): void => {
		setLanguage(lng as TLanguages)
		change(lng)
	}

	const items: ItemType[] = languageModalMenu.map(item => ({
		...item,
		onClick: () => setLang(item?.key as TLanguages),
	}))

	const getLabel = () => {
		if (language == 'uz') return "O'zbekcha"
		if (language == 'ru') return 'Русский'
		if (language == 'en') return 'English'
	}

	return (
		<div className='border border-blue-500 rounded-lg flex px-2 h-10'>
			<CustomDropdown
				menu={{
					items,
					selectable: true,
					defaultSelectedKeys: [language],
				}}
				trigger={['hover']}
				overlayStyle={{ width: 150 }}
				forceRender
			>
				{customBtn ? (
					customBtn
				) : (
					<Button
						icon={<GlobalOutlined />}
						type='primary'
						ghost
						size='large'
						label={
							isDrawer && (mobile || mobileLg || tablet)
								? getLabel()
								: undefined
						}
					/>
				)}
			</CustomDropdown>
		</div>
	)
}
