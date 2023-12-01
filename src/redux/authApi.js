import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (formData) => ({
                url: '/api/auth',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['User']
        }),
        loginUser: builder.mutation({
            query: (formData) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['User']
        }),
        googleLogin: builder.mutation({
            query: (formData) => ({
                url: '/api/auth/google',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useGoogleLoginMutation } = authApi