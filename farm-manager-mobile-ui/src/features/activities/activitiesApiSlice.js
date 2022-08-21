import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";



export const activitiesAdapter = createEntityAdapter({
     selectId: e => e.uuid,
    //     console.log(e,a)

    //    return e.uuid},
    sortComparer: (e) => e.execution,
})
const initialState = activitiesAdapter.getInitialState()

// export function safeParseJson(json) {

//     if (json) {
//         try {
//             return JSON.parse(json);
//         }
//         catch (err) {

//         }
//     }
//     return null;
// }

export const activityApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getActivitiesFlat: builder.query({

            query: (args) => `/api/farm/activities/flat/${args.page}/${args.maxResult}/${args.isPlan}/${args.orderBy}/${args.dir}`,
            transformResponse: responseData => {

                return activitiesAdapter.setAll(initialState, responseData.content)
            },
            providesTags: (result, error, arg) => [
                { type: 'Activities', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Activities', id }))
            ]
        })
    })
})

export const {
    useGetActivitiesFlatQuery
} = activityApiSlice


// returns the query result object
export const selectActivitiesResult = activityApiSlice.endpoints.getActivitiesFlat.select()

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

export const getActivitiesState = (state) => state;
