import { theme } from 'antd'
import { ETheme } from '../../types/app'
import { colors } from './colors'
import { components, token } from './config'

export const antTheme = (mode: ETheme) => ({
	token: { ...token, ...colors[mode] },
	components,
	algorithm:
		mode === ETheme.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
})
