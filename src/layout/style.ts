import { Layout, Menu, type SiderProps } from 'antd'
import styled from 'styled-components'
import type { StyleProps } from './type'

export const LayoutContent = styled(Layout.Content)<{ collapsed: boolean }>`
	background: ${({ $bg }) => $bg};
	height: 90vh;
	margin-left: ${({ collapsed }) => (collapsed ? '80px' : '256px')};
	margin-top: 78px;
	overflow-y: auto;
	padding: var(--2xl);
	transition: margin-left 0.2s ease;
`

export const LayoutHeader = styled(Layout.Header)<StyleProps>`
	height: ${({ $height = '76px' }) => $height};
	width: ${({ $width }) => $width};
	display: flex;
	position: fixed;
	top: 0;
	width: 100%;
	align-items: center;
	background: ${({ $bg }) => $bg};
	justify-content: space-between;
	padding: ${({ $padding = '10 24px' }) => $padding};
	z-index: 10;
`
export const LayoutSider = styled(Layout.Sider)<SiderProps>`
    height: 90vh;
    border-radius: 1px;
    width: 256px;
    top: 0px;
   position: fixed;
    padding: var(--2xl);
    box-shadow: ${({ theme }) =>
		theme == 'light'
			? '0px 2px 4px 0px #00000005, 0px 1px 6px -1px #00000005, 0px 1px 2px 0px #00000008;'
			: '0px 2px 4px 0px #ffffff05, 0px 1px 6px -1px #ffffff05, 0px 1px 2px 0px #ffffff08;'}
    z-index: 999;
`

export const AntMenu = styled(Menu)`
	// custom styles bu yerda
	background-color: #fff;
	border-right: none;
`
