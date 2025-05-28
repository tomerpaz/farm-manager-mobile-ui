import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { FieldPoints_TAG, Layers_TAG, Points_TAG, apiSlice } from "../../app/api/apiSlice";

export const adapter = createEntityAdapter()

const initialState = adapter.getInitialState()


export const pointsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getFieldPoints: builder.query({
            query: (args) => `/api/farm/points/field/${args.fieldId}`,
            providesTags: [FieldPoints_TAG],
        }),

        getPoints: builder.query({
            query: (args) => `/api/farm/points?${buildPointSearch(args)}`,
            providesTags: [Points_TAG],
        }),

        getLayers: builder.query({
            query: (args) => `/api/farm/layers`,
            providesTags: [Layers_TAG],
        }),

        getPoint: builder.query({
            query: (args) => `/api/farm/points/${args.id}`,
        }),

        createFieldPoint: builder.mutation({
            query: args => ({
                url: '/api/farm/points',
                method: 'POST' ,
                body: { ...args },
                
            }),
            invalidatesTags: [Points_TAG,FieldPoints_TAG]
               
        }),
        updateFieldPoint: builder.mutation({
            query: args => ({
                url: '/api/farm/points',
                method: 'PUT' ,
                body: { ...args },
                
            }),
            invalidatesTags: [Points_TAG, FieldPoints_TAG]
        }),
        deleteFieldPoint: builder.mutation({
            query: args => ({
                url: `/api/farm/points/${args.id}`,
                method: 'DELETE' ,    
            }),
            invalidatesTags: [Points_TAG, FieldPoints_TAG]
        }),
    })
})


const buildPointSearch = ({ types }) => {
    let urlParams = null;
    types.forEach((r, index, arr) => {
        if (!urlParams) {
            if (r) {
                urlParams = 'type=' + r;
            }
        } else {
            if (r) {
                urlParams += '&type=' + r;
            }
        }
    });
    // if (reference) {
    //     urlParams += '&ref=' + reference;
    // }
    return urlParams;
}

export const {
    useGetFieldPointsQuery,
    useGetPointsQuery,
    useGetPointQuery,
    useCreateFieldPointMutation,
    useUpdateFieldPointMutation,
    useDeleteFieldPointMutation,
    useGetLayersQuery,
} = pointsApiSlice



