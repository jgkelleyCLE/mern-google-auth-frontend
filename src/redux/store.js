import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { authApi } from './authApi'
import { userApi } from './userApi'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(authApi.middleware, userApi.middleware)
        
    
})

