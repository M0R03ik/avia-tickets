import { configureStore } from '@reduxjs/toolkit'
import ticketsSlice from './slices/ticketsSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    tickets: ticketsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type RootDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<RootDispatch>()
