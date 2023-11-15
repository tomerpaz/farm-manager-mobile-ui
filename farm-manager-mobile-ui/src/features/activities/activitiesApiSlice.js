import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { Activities_TAG, FieldActivities_TAG, SelectedActivity_TAG } from "../auth/authApiSlice";


export const activitiesAdapter = createEntityAdapter({
    selectId: e => e.uuid,
    sortComparer: (e) => e.execution,
})
const initialState = activitiesAdapter.getInitialState()


export const activityApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getActivitiesFlat: builder.query({

            query: (args) => `/api/farm/activities/flat/${args.page}/${args.maxResult}/${args.isPlan}/${args.orderBy}/${args.dir}?filter=${args.filter}`,
            // transformResponse: responseData => {

            //     return activitiesAdapter.setAll(initialState, responseData.content)
            // },

            
            providesTags: ['Activities']
        }),
        getActivitiesField: builder.query({
            query: (args) => `/api/farm/activities/field/${args.fieldId}/${args.page}/${args.maxResult}/${args.isPlan}/${args.orderBy}/${args.dir}?filter=${args.filter}`,
            // transformResponse: responseData => {

            //     return fieldActivitiesAdapter.setAll(fieldActivityinitialState, responseData)
            // },
            
            providesTags: ['FieldActivities'],

            // providesTags: (result, error, arg) => {

            //     return [

            //         { type: 'FieldActivities', id: "LIST" },
            //         ...result.content.map(e => ({ type: 'FieldActivities', id: e.id }))
            //     ]
            // }
            
        }),
        getActivityById: builder.query({
            query: (uuid) => `/api/farm/activity/${uuid}`,
            // transformResponse: responseData => {
            //     const act = {...responseData}
            //     act.execution = parseISOOrNull(responseData.execution);
            //     return act;
            // },
           providesTags: ['SelectedActivity'],

        }),

        createActivity: builder.mutation({
            query: args => ({
                url: '/api/farm/activity',
                method: 'POST' ,
                body: { ...args },
                
            }),
            invalidatesTags: [Activities_TAG, SelectedActivity_TAG, FieldActivities_TAG]
               
        }),
        updateActivity: builder.mutation({
            query: args => ({
                url: '/api/farm/activity',
                method: 'PUT' ,
                body: { ...args },
                
            }),
            invalidatesTags: [Activities_TAG, SelectedActivity_TAG, FieldActivities_TAG]

        }),

        deleteActivity: builder.mutation({
            query(uuid) {
              return {
                url: `/api/farm/activity/${cccc(uuid)}`,
                method: 'DELETE',
              }
            },
           invalidatesTags: [Activities_TAG, SelectedActivity_TAG, FieldActivities_TAG]
          }),

    })
})

const cccc = (uuid) => {
    console.log('delete uuid', uuid);
    return uuid;
}

export const {
    useGetActivitiesFlatQuery,
    useGetActivitiesFieldQuery,
    useGetActivityByIdQuery,
    useCreateActivityMutation,
    useUpdateActivityMutation,
    useDeleteActivityMutation,
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
