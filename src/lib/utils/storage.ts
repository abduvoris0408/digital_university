export const getLocalStorage = (key: string) => {
	const item = localStorage.getItem(key)
	if (!item) {
		return null
	}

	try {
		return JSON.parse(item)
	} catch (error) {
		return item
	}
}

export const setLocalStorage = (key: string, value: any) =>
	localStorage.setItem(key, JSON.stringify(value))

export const removeLocalStorage = (key: string): void =>
	localStorage.removeItem(key)

export const clearLocalstorage = () => localStorage.clear()
