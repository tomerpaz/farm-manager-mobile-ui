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
            invalidatesTags: ['Field', 'Activities', 'User', 'FieldActivities', 
            'Dashboard','ActivityDefs', 'Crops','SelectedActivity','Warehouses'
            ]
        }),
        getUser: builder.mutation({
            query: () => ({
                url: '/api/farm/user',
              
            }),
            providesTags: (result, error, arg) => [
                'User'
            ]
        }),
        getUserData: builder.query({
            query: () => ({
                url: '/api/farm/user',
              
            }),
            providesTags:  ['User']
        }),
    })
})

export const {
    useLoginMutation,
    useGetUserMutation,
    useGetUserDataQuery
} = authApiSlice