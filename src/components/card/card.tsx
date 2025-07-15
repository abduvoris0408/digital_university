import { Card } from 'antd'
import { useTheme } from 'antd-style'
import styled from 'styled-components'
import type { TCardProps } from '../../types/components'

export const CustomCard = styled(Card).attrs(props => ({
	bordered: props.bordered || false,
}))<TCardProps>`
	border-radius: ${({ $rounded = '0px' }) => $rounded};
	overflow: ${({ $overflow }) => $overflow};
	margin-top: ${({ $mt }) => $mt};
	margin-bottom: ${({ $mb }) => $mb};
	cursor: ${({ $cursor }) => $cursor};
	box-shadow: 0px 0px 0px 1px inset transparent;
	& > .ant-card-body {
		padding: ${({ $p }) => $p};
		transition: all 0.2s ease-in;
		border-radius: ${({ $rounded = '0px' }) => $rounded};
	}
	&:hover .ant-card-body {
		${({ $isHover, $hoverBorderColor }) =>
			$isHover &&
			`box-shadow: 0px 0px 0px 1px inset ${$hoverBorderColor}`};
	}
`

export const AntCard = ({ ...props }: TCardProps) => {
	const { colorPrimaryBorderHover } = useTheme()
	return <CustomCard $hoverBorderColor={colorPrimaryBorderHover} {...props} />
}
