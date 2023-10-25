import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


export const cropsAdapter = createEntityAdapter()

const initialState = cropsAdapter.getInitialState()


export const cropsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getCrops: builder.query({

            query: (args) => `/api/farm/crops`,
            providesTags: ['Crops']
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
    useGetCropsQuery,
} = cropsApiSlice


// returns the query result object
export const selectCropsResult = cropsApiSlice.endpoints.getCrops.select()

// // Creates memoized selector
// const selectFieldsData = createSelector(
//     selectFieldssResult,
//     fieldsResult => fieldsResult.data // normalized state object with ids & entities
// )

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllFields,
//     selectById: selectFieldById,
//     selectIds: selectFieldIds,
//     //   selectByYear: selectFieldByYear,
//     // Pass in a selector that returns the fields slice of state
// } = fieldsAdapter.getSelectors(state => selectFieldsData(state) ?? initialState)

export const getCropsState = (state) => state;
