import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { FieldPoints_TAG, FieldScouts_TAG, apiSlice } from "../../app/api/apiSlice";

export const adapter = createEntityAdapter()

const initialState = adapter.getInitialState()


export const scoutsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getFieldScouts: builder.query({
            query: (args) => `/api/farm/scouts/field/${args.fieldId}`,
            providesTags: [FieldScouts_TAG],
        }),

        createFieldScout: builder.mutation({
            query: args => ({
                url: '/api/farm/scouts',
                method: 'POST',
                body: { ...args },

            }),
            invalidatesTags: [FieldScouts_TAG, FieldPoints_TAG]

        }),
        updateFieldScout: builder.mutation({
            query: args => ({
                url: '/api/farm/scouts',
                method: 'PUT',
                body: { ...args },

            }),
            invalidatesTags: [FieldScouts_TAG, FieldPoints_TAG]
        }),
        deleteFieldScout: builder.mutation({
            query: args => ({
                url: `/api/farm/scouts/${args.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [FieldScouts_TAG, FieldPoints_TAG]
        }),
    })
})


export const {
    useGetFieldScoutsQuery,
    useCreateFieldScoutMutation,
    useUpdateFieldScoutMutation,
    useDeleteFieldScoutMutation
} = scoutsApiSlice



