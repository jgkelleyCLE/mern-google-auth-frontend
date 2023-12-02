import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user.token;

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
            return headers;
        }
    
    }
}),
tagTypes: ['User'],
endpoints: (builder) => ({
    updateUser: builder.mutation({
        query: (id, formData) => ({
            url: `/api/user/update/${id}`,
            method: 'PUT',
            body: formData
        }),
        invalidatesTags: ['User']
    })
})
})


export const { useUpdateUserMutation } = userApi