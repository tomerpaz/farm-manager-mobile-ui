import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut } from '../../features/auth/authSlice'




const baseQuery = fetchBaseQuery({
    //  baseUrl: 'http://localhost:8080',

        baseUrl: 'https://api.manager.farm',
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        //const token = getState().auth.token;

        const token = localStorage.getItem('token');
        if (token) {

            headers.set("X-Authorization", `Bearer ${token}`)
        }
        headers.set("Content-Type", 'application/json')
        headers.set('X-Requested-With', 'XMLHttpRequest')

        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {

    console.log(args)
    let result = await baseQuery(args, api, extraOptions)
    console.log('result',result)

    // if (result?.error?.status === 401) {
    //     console.log('sending refresh token')
    //     // send refresh token to get new access token 
    //     const refreshResult = await baseQuery('/refresh', api, extraOptions)
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

        api.dispatch(logOut())

        if(api.util && api.util.resetApiState){
            api.dispatch( api.utils.resetApiState())
        }
      //  api.dispatch(api.util.resetApiState())
        // if(api.util && api.util.invalidateTags){
        //     api.dispatch( api.utils.invalidateTags(['Field', 'Activities', 'User', 'FieldActivities']))
        // }

    }
    if (result?.error?.status === 401) {
        api.dispatch(logOut())
        if(api.util && api.util.resetApiState){
            api.dispatch( api.utils.resetApiState())
        }
      //  api.dispatch(api.util.resetApiState())
        // if(api.util && api.util.invalidateTags){
        //     api.dispatch( api.utils.invalidateTags(['Field', 'Activities', 'User', 'FieldActivities']))
        // }

    }
    return result
}

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Field', 'Activities', 'User', 'FieldActivities'],

    endpoints: builder => ({})
})
