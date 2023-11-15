import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { Containers_TAG } from "../auth/authApiSlice";


// export const activityDefsAdapter = createEntityAdapter()

// const initialState = activityDefsAdapter.getInitialState()


export const containersApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getContainers: builder.query({

            query: (args) => `/api/farm/containers`,
            providesTags: [Containers_TAG]
        }),
    
    })
})

export const {
    useGetContainersQuery,
} = containersApiSlice


// returns the query result object
export const selectContainersResult = containersApiSlice.endpoints.getContainers.select()

export const getContainersState = (state) => state;
