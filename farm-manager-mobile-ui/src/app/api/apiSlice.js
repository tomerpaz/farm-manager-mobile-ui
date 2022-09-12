import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut } from '../../features/app/appSlice'


 export const FARM_MANAGER = 'http://localhost:8080'

// export const FARM_MANAGER = 'https://api.manager.farm'


const baseQuery = fetchBaseQuery({
    //baseUrl: 'http://localhost:8080',

    baseUrl: FARM_MANAGER,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().app.token;

        //const token = localStorage.getItem('token');
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

    // if (result?.error?.status === 401) {
    //     console.log('sending refresh token')
    //     // send refresh token to get new access token 
    //     const refreshResult = await baseQuery('/api/auth/token', api, extraOptions)
    //     if (refreshResult?.data) {
    //         const user = api.getState().auth.user
    //         // store the new token 
    //         api.dispatch(setCredentials({ ...refreshResult.data, user }))
    //         // retry the original query with new access token 
    //         result = await baseQuery(args, api, extraOptions)

    //     } else {
    //         api.dispatch(logOut())
    //     }
    // }
    if (result?.status === 401) {
        console.log('result?.status === 401')

        api.dispatch(logOut())

        if(api.util && api.util.resetApiState){
            api.dispatch( api.utils.resetApiState())
        }
    }
    if (result?.error?.status === 401) {
        console.log('result?.error?.status === 401')

        api.dispatch(logOut())
        if(api.util && api.util.resetApiState){
            api.dispatch( api.utils.resetApiState())
        }


    }
    if (result?.error?.data?.status === 401) {
        console.log('result?.error?.data?.status === 401')
        api.dispatch(logOut())
        if(api.util && api.util.resetApiState){
            api.dispatch( api.utils.resetApiState())
        }
    }
    return result
}

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Field', 'Activities', 'User', 'FieldActivities', 'Dashboard'],

    endpoints: builder => ({})
})

