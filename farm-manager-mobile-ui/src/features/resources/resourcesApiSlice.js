import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


export const resourcesAdapter = createEntityAdapter()

const initialState = resourcesAdapter.getInitialState()

export const CUSTOMER = 'customer';

export const resourcesApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getResources: builder.query({
            query: (args) => `/api/farm/${args.type}/resources`,
            providesTags: ['Resources']
            // transformResponse: responseData => {

            //     return activitiesAdapter.setAll(initialState, responseData.content)
            // },
            // providesTags: (result, error, arg) => [
            //     { type: 'ActivityDefs', id: "LIST" },
            //     ...result.content.map(e => ({ type: 'ActivityDefs', id: e.id }))
            // ]
        }),
    
    })
})

export const {
    useGetResourcesQuery,
} = resourcesApiSlice


// returns the query result object
//export const selectResourcesResult = resourcesApiSlice.endpoints.getResources.select()


export const getResourcesState = (state) => state;
