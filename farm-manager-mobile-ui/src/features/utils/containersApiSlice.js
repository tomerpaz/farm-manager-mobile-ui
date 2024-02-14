import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { Containers_TAG, Qualities_TAG, Sizes_TAG } from "../auth/authApiSlice";


// export const activityDefsAdapter = createEntityAdapter()

// const initialState = activityDefsAdapter.getInitialState()


export const containersApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getContainers: builder.query({

            query: (args) => `/api/farm/containers`,
            providesTags: [Containers_TAG]
        }),

        getQualities: builder.query({

            query: (args) => `/api/farm/qualities`,
            providesTags: [Qualities_TAG]
        }),

        getSizes: builder.query({

            query: (args) => `/api/farm/sizes`,
            providesTags: [Sizes_TAG]
        }),
    
    })
})

export const {
    useGetContainersQuery,
    useGetQualitiesQuery,
    useGetSizesQuery
} = containersApiSlice


// returns the query result object
// export const selectContainersResult = containersApiSlice.endpoints.getContainers.select()
// export const selectSizesResult = containersApiSlice.endpoints.getSizes.select()
// export const selectQualitiesResult = containersApiSlice.endpoints.getQualities.select()

export const getContainersState = (state) => state;
export const getQualitiesState = (state) => state;
export const getSizesState = (state) => state;

