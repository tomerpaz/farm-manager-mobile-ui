import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { Points_TAG, apiSlice } from "../../app/api/apiSlice";

export const adapter = createEntityAdapter()

const initialState = adapter.getInitialState()


export const pointsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getFieldPoints: builder.query({
            query: (args) => `/api/farm/points/field/${args.fieldId}`,
            providesTags: [Points_TAG],
        }),

        createFieldPoint: builder.mutation({
            query: args => ({
                url: '/api/farm/points',
                method: 'POST' ,
                body: { ...args },
                
            }),
            invalidatesTags: [Points_TAG]
               
        }),
        updateFieldPoint: builder.mutation({
            query: args => ({
                url: '/api/farm/points',
                method: 'PUT' ,
                body: { ...args },
                
            }),
            invalidatesTags: [Points_TAG]
        }),
    })
})


export const {
    useGetFieldPointsQuery,
    useCreateFieldPointMutation,
    useUpdateFieldPointMutation,
} = pointsApiSlice



