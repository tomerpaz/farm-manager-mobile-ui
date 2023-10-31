import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


export const tariffAdapter = createEntityAdapter()

const initialState = tariffAdapter.getInitialState()

const buildResourceTariffSearch = (args) =>{
    return ''
}

export const tariffApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getResourcesTariff: builder.query({
            query: (args) => `/api/farm/resources/tariff/${args.activityType}/${args.date}?${buildResourceTariffSearch(args)}`,
            //providesTags: ['Tariff']
        }),
    
    })
})

export const {
    useGetResourcesTariffQuery,
} = tariffApiSlice


//export const selectTariffResult = tariffApiSlice.endpoints.getTariff.select()

export const getTariffState = (state) => state;
