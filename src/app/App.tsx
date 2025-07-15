import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import 'antd/dist/reset.css'
import { Loading } from '../components/loading'
import { useToken } from '../lib/hooks/useToken'
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
				<HistoryProvider history={history}>
					<Router />
				</HistoryProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryProvider>
		</>
	)
}

export default App
