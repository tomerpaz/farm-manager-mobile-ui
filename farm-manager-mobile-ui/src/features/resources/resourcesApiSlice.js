import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { Resources_TAG } from "../auth/authApiSlice";


export const resourcesAdapter = createEntityAdapter()

const initialState = resourcesAdapter.getInitialState()

export const CUSTOMER = 'customer';

export const resourcesApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getResources: builder.query({
            query: (args) => `/api/farm/${args.type}/resources`,
            providesTags: [Resources_TAG]
        }),
    
    })
})

export const {
    useGetResourcesQuery,
} = resourcesApiSlice


// returns the query result object
//export const selectResourcesResult = resourcesApiSlice.endpoints.getResources.select()


export const getResourcesState = (state) => state;
