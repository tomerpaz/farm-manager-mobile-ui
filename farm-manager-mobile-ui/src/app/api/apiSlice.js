import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut, setUserData } from '../../features/auth/authSlice'




const baseQuery = fetchBaseQuery({
   // baseUrl: 'http://localhost:8080',
     baseUrl: 'https://api.manager.farm',
   // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('token')        //getState().auth.token
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
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
            
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Field'],

    endpoints: builder => ({})
})

