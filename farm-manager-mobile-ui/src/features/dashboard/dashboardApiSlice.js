import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { Dashboard_TAG } from "../auth/authApiSlice";




export const dashboardApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getFieldDashBoard: builder.query({

            query: (args) => `/api/farm/dashboard/field/${args.fieldId}?year=${args.year}`,
            
            providesTags: (result, error, args) => [
                { type: Dashboard_TAG, id: args.fieldId },
            ]
        })
    })
})

export const {
   
    useGetFieldDashBoardQuery
} = dashboardApiSlice





