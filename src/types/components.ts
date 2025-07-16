export type TCardProps = {
	$rounded?: string
	$overflow?: string
	$hoverBorderColor?: string
	$isHover?: boolean
	$cursor?: string
}
export type TBoxProps = {
	$display?: string
	$align?: string
	$direction?: string
	$justify?: string
	$gap?: string
	$height?: string
	$width?: string
	$maxWidth?: string
	$minWidth?: string
	$bg?: string
	$bgHover?: string
	$pos?: string
	$rounded?: string
	$childrenLabels?: string
}
export type TTextProps = {
	$opacity?: string
	$color?: string
	$lineHeigt?: string
	$m?: string
	$mb?: string
	$mt?: string
	$p?: string
	$fs?: string
	$fw?: string
	$textAlign?: string
	$notSansSerif?: boolean
	$font?: string
}
export type TButtonProps = {
	label?: string
	icon?: React.JSX.Element
} & ButtonProps
