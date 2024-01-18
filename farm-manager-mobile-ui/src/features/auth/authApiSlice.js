import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


// export const authAdapter = createEntityAdapter()
// const initialState = authAdapter.getInitialState()
export const Field_TAG = 'Field';
export const Activities_TAG = 'Activities';
export const FieldActivities_TAG = 'FieldActivities';
export const User_TAG = 'User';
export const Dashboard_TAG = 'Dashboard';
export const ActivityDefs_TAG = 'ActivityDefs';
export const Crops_TAG = 'Crops';
export const SelectedActivity_TAG = 'SelectedActivity';
export const Warehouses_TAG = 'Warehouses';
export const Resources_TAG = 'Resources';
export const Containers_TAG = 'Containers';
export const CropPesticides_TAG = 'CropPesticides_TAG';

// const _TAG = '';
// const _TAG = '';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: [Field_TAG, Activities_TAG,User_TAG, FieldActivities_TAG, 
            Dashboard_TAG,ActivityDefs_TAG,Crops_TAG ,SelectedActivity_TAG, Warehouses_TAG,
            Resources_TAG,Containers_TAG,CropPesticides_TAG
            ]
        }),
        // getUser: builder.mutation({
        //     query: () => ({
        //         url: '/api/farm/user',
              
        //     }),
        //     providesTags: (result, error, arg) => [
        //         User_TAG
        //     ]
        // }),
        getUserData: builder.query({
            query: () => ({
                url: '/api/farm/user',
              
            }),
            providesTags:  [User_TAG]
        }),
    })
})

export const {
    useLoginMutation,
    // useGetUserMutation,
    useGetUserDataQuery
} = authApiSlice