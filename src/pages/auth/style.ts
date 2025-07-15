import type { FormProps } from 'antd'
import { Form, Layout } from 'antd'
import styled from 'styled-components'
import type { StyleProps } from '../../layout/type'

export const Auth = styled(Layout)<StyleProps>`
	background-color: ${({ $bg }) => $bg};
	min-height: 100vh;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

export const AuthForm = styled(Form)<FormProps>`
	padding: 24px 0px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
`
