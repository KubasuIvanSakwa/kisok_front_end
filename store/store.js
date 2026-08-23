import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { fetchAll } from '../api/api';

export const useCount = create(
    persist((set) => ({
        count: 0,
        increment: () => set(({ count }) => ({ count: count + 1 })),
        reset: () => set({ count: 0 }),
        decrement: () => set(({ count }) => ({ count: count - 1 })),
    }), {name: 'count'})
)



export const useAttendants = create(
    persist(
        (set) => ({
            Attendants: [],
            loading: false,
            errorM: '',
            fetchAttendants: async () => {
                set({ loading: true })
                const All = await fetchAll()
                set({ Attendants: All.data, loading: false })
            },
        }), { name: "attendants" }))