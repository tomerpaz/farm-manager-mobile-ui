import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../../features/app/appSlice'



 export const FARM_MANAGER = 'http://localhost:8080'

//export const FARM_MANAGER = 'https://api.manager.farm'


const baseQuery = fetchBaseQuery({
    baseUrl: FARM_MANAGER,
    // credentials: 'include',
    prepareHeaders: (headers, { getState,  }) => {

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
    tagTypes: ['Field', 'Activities', 'User', 'FieldActivities', 'Dashboard','ActivityDefs', 'Crops'],

    endpoints: builder => ({})
})

