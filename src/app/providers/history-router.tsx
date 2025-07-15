import type { BrowserHistory } from 'history'
import { useLayoutEffect } from 'react'
import { Router, type RouterProps } from 'react-router-dom'
import { useAppStore } from '../../store/app/app'

type Props = {
	history: BrowserHistory
} & Partial<RouterProps>

export const HistoryProvider = ({ history, ...props }: Props) => {
	const { action, setHistory, location } = useAppStore()

	useLayoutEffect(() => history.listen(setHistory), [history])

	return (
		<Router
			{...props}
			location={location}
			navigationType={action}
			navigator={history}
		/>
	)
}
