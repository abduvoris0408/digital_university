import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'antd/dist/reset.css'
import { I18nextProvider } from 'react-i18next'
import { Loading } from '../components/loading'
import { useToken } from '../lib/hooks/useToken'
import { i18n } from '../lib/i18n'
import { Router } from '../router/router'
import { history } from '../utils/history'
import { QueryProvider } from './providers'
import { HistoryProvider } from './providers/history-router'
const App = () => {
	const { isInitiated } = useToken()

	if (!isInitiated) {
		return (
			<div>
				<Loading />
			</div>
		)
	}

	return (
		<>
			<QueryProvider>
				<I18nextProvider i18n={i18n}>
					<HistoryProvider history={history}>
						<Router />
					</HistoryProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</I18nextProvider>
			</QueryProvider>
		</>
	)
}

export default App
