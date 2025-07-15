import styled from 'styled-components'
import type { TBoxProps } from '../../types/components'

export const Box = styled.div<TBoxProps>`
	position: ${({ $pos }) => $pos};
	align-items: ${({ $align }) => $align};
	display: ${({ $display = 'flex' }) => $display};
	flex-direction: ${({ $direction }) => $direction};
	justify-content: ${({ $justify }) => $justify};
	gap: ${({ $gap }) => $gap};
	height: ${({ $height }) => $height};
	margin: ${({ $m }) => $m};
	margin-bottom: ${({ $mb }) => $mb};
	margin-top: ${({ $mt }) => $mt};
	padding: ${({ $p }) => $p};
	width: ${({ $width }) => $width};
	max-width: ${({ $maxWidth }) => $maxWidth};
	min-width: ${({ $minWidth }) => $minWidth};
	background: ${({ $bg }) => $bg};
	border-radius: ${({ $rounded }) => $rounded};
	* label {
		${({ $childrenLabels }) => $childrenLabels};
	}
	&:hover {
		background: ${({ $bgHover }) => $bgHover};
	}
`
