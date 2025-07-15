import type { ThemeConfig } from 'tailwindcss/plugin'

const controlHeightLG = 40

export const token: ThemeConfig['token'] = {
	fontFamily: 'Inter, sans-serif',
	colorBorderSecondary: '#F0F0F0',
	borderRadius: 8,
}

export const components: ThemeConfig['components'] = {
	Button: {
		controlHeightLG,
		fontSizeIcon: 14,
		algorithm: true,
	},

	Card: {
		headerFontSize: 12,
	},

	Layout: {
		borderRadiusLG: 0,
		headerPadding: '8px',
		algorithm: true,
	},

	Form: {
		labelFontSize: 14,
		verticalLabelPadding: '0 0 4px',
		controlHeightLG: 8,
		fontWeightStrong: 500,
		itemMarginBottom: 16,
	},

	FloatButton: {
		fontSizeIcon: 16,
		controlHeightLG: 48,
		fontSizeSM: 16,
	},

	Input: {
		padding: 12,
		paddingBlock: 12,
		controlHeightLG,
	},

	Select: {
		controlHeightLG,
		padding: 12,
		fontSizeLG: 14,
	},

	Tabs: {
		fontSize: 14,
		padding: 4,
		colorBorderSecondary: '#F0F0F0',
		titleFontSizeLG: 14,
	},

	Table: {
		cellPaddingBlockMD: 17,
	},

	Typography: {
		titleMarginBottom: 0,
		titleMarginTop: 0,
	},

	Checkbox: {
		controlInteractiveSize: 20,
	},

	Radio: {
		radioSize: 20,
		dotSize: 12,
	},

	Skeleton: {
		borderRadiusSM: 8,
	},

	Switch: {
		handleSize: 27,
		trackHeight: 31,
		trackMinWidth: 51,
	},

	Menu: {
		itemMarginInline: 0,
		itemMarginBlock: '0 6px',
	},

	Collapse: {
		borderRadiusLG: 6,
	},
}
