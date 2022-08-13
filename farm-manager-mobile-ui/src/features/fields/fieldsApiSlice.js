import { apiSlice } from "../../app/api/apiSlice";


const fieldsAdapter = createEntityAdapter({
    //sortComparer: (a, b) => b.date.localeCompare(a.date)
})
const initialState = fieldsAdapter.getInitialState()


export const fieldsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFields: builder.mutation({
            query: year => `/api/farm/fields/${year}`
        }),
        transformResponse: responseData => {
            return fieldsAdapter.setAll(initialState, responseData)
        },
        providesTags: (result, error, arg) => [
            { type: 'Field', id: "LIST" },
            ...result.ids.map(id => ({ type: 'Field', id }))
        ]
    })
})

export const {
    useGetFieldsQuery
} = fieldsApiSlice