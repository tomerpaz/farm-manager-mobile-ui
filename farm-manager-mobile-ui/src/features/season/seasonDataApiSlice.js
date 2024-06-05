import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { Season_TAG, apiSlice } from "../../app/api/apiSlice";

export const adapter = createEntityAdapter()

const initialState = adapter.getInitialState()


export const seasonApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getSeasonData: builder.query({
            query: (args) => `/api/farm/seasondata/${args.year}/${args.fieldId}`,
            providesTags: [Season_TAG],
        }),

        createSeasonData: builder.mutation({
            query: args => ({
                url: '/api/farm/seasondata',
                method: 'POST' ,
                body: { ...args },
                
            }),
            invalidatesTags: [Season_TAG]
               
        }),
        updateSeasonData: builder.mutation({
            query: args => ({
                url: '/api/farm/seasondata',
                method: 'PUT' ,
                body: { ...args },
                
            }),
            invalidatesTags: [Season_TAG]

        }),
    })
})


export const {
    useGetSeasonDataQuery,
    useCreateSeasonDataMutation,
    useUpdateSeasonDataMutation,
} = seasonApiSlice


// returns the query result object
//export const selectSeasonResult = seasonApiSlice.endpoints.getSeasonData.select()


export const getSeasonDataState = (state) => state;
