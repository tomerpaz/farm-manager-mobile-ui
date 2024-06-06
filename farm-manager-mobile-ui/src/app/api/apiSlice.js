import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../../features/app/appSlice'

export const Field_TAG = 'Field';
export const Activities_TAG = 'Activities';
export const FieldActivities_TAG = 'FieldActivities';
export const User_TAG = 'User';
export const Dashboard_TAG = 'Dashboard';
export const ActivityDefs_TAG = 'ActivityDefs';
export const Crops_TAG = 'Crops';
export const SelectedActivity_TAG = 'SelectedActivity';
export const Warehouses_TAG = 'Warehouses';
export const Resources_TAG = 'Resources';
export const Containers_TAG = 'Containers';
export const CropPesticides_TAG = 'CropPesticides_TAG';
export const Qualities_TAG = 'Qualities';
export const Sizes_TAG = 'Sizes';
export const Inventory_TAG = 'Inventory_TAG';
export const Season_TAG = 'FieldSeason';

// export const FARM_MANAGER = 'http://localhost:8080'

 export const FARM_MANAGER = 'https://api.manager.farm'


const baseQuery = fetchBaseQuery({
    baseUrl: FARM_MANAGER,
    // credentials: 'include',
    prepareHeaders: (headers, { getState, }) => {

        const token = 'refresh' === getState().app.token ? getState().app.refreshToken : getState().app.token;
        if (token) {
            headers.set("X-Authorization", `Bearer ${token}`)
        }
        headers.set("Content-Type", 'application/json')
        headers.set('X-Requested-With', 'XMLHttpRequest')
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {

        const refreshToken = api.getState().app.refreshToken;

        api.dispatch(setCredentials({ token: 'refresh', refreshToken }))

        console.log('sending refresh token')

        const refreshResult = await baseQuery('/api/auth/token', api, extraOptions)

        if (refreshResult?.data) {
            const refreshToken = api.getState().app.refreshToken;
            const token = refreshResult.data.token;
            // // store the new token 
            api.dispatch(setCredentials({ token, refreshToken }))
            // // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
            if (api.util && api.util.resetApiState) {
                api.dispatch(api.utils.resetApiState())
            }
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: baseQueryWithReauth,
    tagTypes: [Field_TAG, Activities_TAG, User_TAG, FieldActivities_TAG,
        Dashboard_TAG, ActivityDefs_TAG, Crops_TAG, SelectedActivity_TAG, Warehouses_TAG, Containers_TAG,
        Resources_TAG, CropPesticides_TAG, Qualities_TAG, Sizes_TAG, Inventory_TAG, Season_TAG
    ],

    endpoints: builder => ({})
})

