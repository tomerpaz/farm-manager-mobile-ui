import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        getUser: builder.mutation({
            query: () => ({
                url: '/api/farm/user',
              
            })
        }),
        getUserData: builder.query({
            query: () => ({
                url: '/api/farm/user',
              
            })
        }),
    })
})

export const {
    useLoginMutation,
    useGetUserMutation,
    useGetUserDataQuery
} = authApiSlice