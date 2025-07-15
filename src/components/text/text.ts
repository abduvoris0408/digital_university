import { Typography, theme } from 'antd'
import styled from 'styled-components'
import type { TTextProps } from '../../types/components'

export const Text = styled(Typography.Paragraph).attrs(props => ({
	as: props.as || 'p',
}))<TTextProps>`
	font-size: ${({ $fs = '14px' }) => $fs};
	font-weight: ${({ $fw }) => $fw};
	font-family: ${({ $font, $notSansSerif }) =>
		$notSansSerif ? $font : $font && `${$font}, sans-serif`};
	opacity: ${({ $opacity }) => $opacity};
	line-height: ${({ $lineHeigt = '22px' }) => $lineHeigt};
	margin: ${({ $m }) => $m};
	margin-bottom: ${({ $mb }) => $mb};
	margin-top: ${({ $mt }) => $mt};
	padding: ${({ $p }) => $p};
	text-align: ${({ $textAlign }) => $textAlign};
	color: ${({ $color = theme.useToken().token.colorTextBase }) => $color};
	& span {
		font-size: inherit;
		font-weight: inherit;
	}
	& .AnimatedNumberItem__number {
		font-size: ${({ $fs }) => $fs};
	}
`

export const Caption = styled(Text)`
	font-size: 12px;
	line-height: 20px;
	font-weight: ${({ $fw = '500' }) => $fw};
`

export const LG = styled(Text)`
	font-size: ${({ $fs = '16px' }) => $fs};
	line-height: ${({ $lineHeigt = '24px' }) => $lineHeigt};
`

export const XL = styled(Text)`
	font-size: ${({ $fs = '20px' }) => $fs};
	line-height: ${({ $lineHeigt = '28px' }) => $lineHeigt};
	font-weight: ${({ $fw = '600' }) => $fw};
`

export const H1 = styled(Text).attrs({ as: 'h1' })`
	font-size: ${({ $fs = '38px' }) => $fs};
	line-height: ${({ $lineHeigt = '46px' }) => $lineHeigt};
	font-weight: 600;
`

export const H2 = styled(Text).attrs({ as: 'h2' })`
	font-size: ${({ $fs = '30px' }) => $fs};
	line-height: ${({ $lineHeigt = '38px' }) => $lineHeigt};
	font-weight: ${({ $fw = '600' }) => $fw};
	& .AnimatedNumberItem__number {
		font-size: 30px !important;
		height: 30px !important;
		font-weight: 600;
	}
`

export const H3 = styled(Text).attrs({ as: 'h3' })`
	font-size: ${({ $fs = '24px' }) => $fs};
	line-height: ${({ $lineHeigt = '32px' }) => $lineHeigt};
	font-weight: ${({ $fw = '600' }) => $fw};
`

export const H4 = styled(Text).attrs({ as: 'h4' })`
	font-size: 20px;
	line-height: 28px;
	font-weight: 600;
`

export const H5 = styled(Text).attrs({ as: 'h5' })`
	font-size: 16px;
	line-height: ${({ $lineHeigt = '24px' }) => $lineHeigt};
	font-weight: ${({ $fw = '600' }) => $fw};
`
