import loadable from '@loadable/component'
import type { ComponentType, JSX, ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Loading } from '../components/loading'
import { NotFound } from '../components/notfound/notfound'

type PagesModule = {
	[key: string]: ComponentType
}

const handleCatchChunkError = () => {
	window.location.reload()
	return { default: Loading }
}

export const getLoadablePage = (
	pageName: string,
	moduleName: string
): ComponentType =>
	loadable(
		() =>
			import(`../pages/${moduleName}`)
				.then((mod: PagesModule) => {
					const Page = mod[pageName]
					if (!Page)
						throw new Error(
							`Page "${pageName}" not found in "${moduleName}"`
						)
					return { default: Page }
				})
				.catch(handleCatchChunkError),
		{}
	)

export const createRoute = (
	path: string,
	element: ReactNode,
	children?: RouteObject[]
): RouteObject => ({
	path,
	element,
	children,
})

export const createConditionalRoute = (
	condition: boolean | undefined,
	path: string,
	Component: ReactNode,
	children?: RouteObject[],
	Fallback: JSX.Element = <NotFound />
): RouteObject =>
	condition
		? createRoute(path, Component, children)
		: createRoute(path, Fallback, children)

export const createIndexRoute = (element: ReactNode): RouteObject => ({
	index: true,
	element,
})

export const createConditionalIndexRoute = (
	condition: boolean | undefined,
	Component: JSX.Element,
	Fallback: JSX.Element = <NotFound />
): RouteObject =>
	condition ? createIndexRoute(Component) : createIndexRoute(Fallback)
