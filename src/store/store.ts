import { configureStore } from '@reduxjs/toolkit'
import ticketsSlice from './slices/ticketsSlice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    tickets: ticketsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
