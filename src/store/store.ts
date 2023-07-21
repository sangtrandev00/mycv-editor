import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.slice' 
import { useDispatch } from 'react-redux'

export const store = configureStore({
  // State share across the application
  reducer: {
    user: userReducer
  }
})

// Get RootState and AppDispatch from our store
export type RootState = ReturnType<typeof store.getState> // Why here RootState ?

// In typescript we have to do that.
export type AppDispatch = typeof store.dispatch

// use app dispatch -> async thunk
export const useAppDispatch = () => useDispatch<AppDispatch>()
