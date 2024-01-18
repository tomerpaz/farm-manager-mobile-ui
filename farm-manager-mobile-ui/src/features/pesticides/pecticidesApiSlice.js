import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { CropPesticides_TAG } from "../auth/authApiSlice";


export const pesticidesAdapter = createEntityAdapter()

const initialState = pesticidesAdapter.getInitialState()

export const CUSTOMER = 'customer';

export const resourcesApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getCropPesticides: builder.query({
            query: (args) => `/api/farm/pesticides/${args.cropId}`,
            providesTags: [CropPesticides_TAG]
        }),
    
    })
})

export const {
    useGetCropPesticidesQuery,
} = resourcesApiSlice


// returns the query result object
//export const selectResourcesResult = resourcesApiSlice.endpoints.getResources.select()


//export const getResourcesState = (state) => state;
