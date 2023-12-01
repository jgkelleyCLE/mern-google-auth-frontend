import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { authApi } from './authApi'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware)
        
    
})

