import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


export const tariffAdapter = createEntityAdapter()

const initialState = tariffAdapter.getInitialState()

const buildResourceTariffSearch = ({ reference, resources }) => {
    let urlParams = null;
    resources.forEach((r, index, arr) => {
        if (!urlParams) {
            if (r) {
                urlParams = 'r=' + r;
            }
        } else {
            if (r) {
                urlParams += '&r=' + r;
            }
        }
    });
    if (reference) {
        urlParams += '&ref=' + reference;
    }
    return urlParams;
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

export const getTariffState = (state) => state;
