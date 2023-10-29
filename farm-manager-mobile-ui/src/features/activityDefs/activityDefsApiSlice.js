import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


export const activityDefsAdapter = createEntityAdapter()

const initialState = activityDefsAdapter.getInitialState()


export const activityDefsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getActivityDefs: builder.query({

            query: (args) => `/api/farm/activitydefs`,
            providesTags: ['ActivityDefs']
        }),
    
    })
})

export const {
    useGetActivityDefsQuery,
} = activityDefsApiSlice


// returns the query result object
export const selectActivityDefsResult = activityDefsApiSlice.endpoints.getActivityDefs.select()

export const getActivityDefsState = (state) => state;
