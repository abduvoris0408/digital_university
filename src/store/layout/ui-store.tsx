import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UIState = {
	collapsed: boolean
	setCollapsed: (value: boolean) => void
	toggleCollapsed: () => void
}

export const useUIStore = create<UIState>()(
	persist(
		(set, get) => ({
			collapsed: false,
			setCollapsed: value => set({ collapsed: value }),
			toggleCollapsed: () => set({ collapsed: !get().collapsed }),
		}),
		{
			name: 'ui-storage',
		}
	)
)
