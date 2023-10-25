import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";



export const fieldsAdapter = createEntityAdapter()
const initialState = fieldsAdapter.getInitialState()

export function safeParseJson(json) {

    if (json) {
        try {
            return JSON.parse(json);
        }
        catch (err) {

        }
    }
    return null;
}

export const fieldsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getFieldsByYear: builder.query({
            query: (year) => `/api/farm/fields/${year}`,
            transformResponse: responseData => {
                const fields = responseData.map(field => {
                    if (field?.polygon) field.geoPoints = safeParseJson(field.polygon);
                    return field;
                });


                return fieldsAdapter.setAll(initialState, fields)
            },
            providesTags: (result, error, arg) => [
                { type: 'Field', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Field', id }))
            ]
        })
    })
})

export const {
    useGetFieldsByYearQuery
} = fieldsApiSlice


// returns the query result object
export const selectFieldssResult = fieldsApiSlice.endpoints.getFieldsByYear.select()

// Creates memoized selector
const selectFieldsData = createSelector(
    selectFieldssResult,
    fieldsResult => fieldsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllFields,
    selectById: selectFieldById,
    selectIds: selectFieldIds,
    //   selectByYear: selectFieldByYear,
    // Pass in a selector that returns the fields slice of state
} = fieldsAdapter.getSelectors(state => selectFieldsData(state) ?? initialState)

export const getFieldsState = (state) => state.fields;

export function useFields(year) {
    const { data } = useGetFieldsByYearQuery(year)
    if (data) {
        const fields = data.ids.map(id => data.entities[id]);
        return fields;
    }
    return []
}

export function useFieldsById(year, id) {
    const { data } = useGetFieldsByYearQuery(year)
    if(data && data.entities){
        return data.entities[id]
    } else return null;
}

