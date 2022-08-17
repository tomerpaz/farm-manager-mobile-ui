import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


// export const authAdapter = createEntityAdapter()
// const initialState = authAdapter.getInitialState()


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: [
                { type: 'Field', id: "LIST" },
                { type: 'User', id: "User" }
            ]
        }),
        getUser: builder.mutation({
            query: () => ({
                url: '/api/farm/user',
              
            }),
            providesTags: (result, error, arg) => [
                { type: 'User', id: "User" },
            ]
        }),
        getUserData: builder.query({
            query: () => ({
                url: '/api/farm/user',
              
            }),
            providesTags: (result, error, arg) => [
                { type: 'User', id: "User" },
            ]
        }),
    })
})

export const {
    useLoginMutation,
    useGetUserMutation,
    useGetUserDataQuery
} = authApiSlice