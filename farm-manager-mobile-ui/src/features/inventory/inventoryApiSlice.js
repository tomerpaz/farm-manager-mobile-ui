import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { Inventory_TAG, apiSlice } from "../../app/api/apiSlice";

export const adapter = createEntityAdapter()

export const inventoryApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getInventory: builder.query({
            query: (args) => `/api/farm/resources/inventory/${args.date}?t=''`,
            providesTags: [Inventory_TAG]
        }),
    
    })
})

export const {
    useGetInventoryQuery,
} = inventoryApiSlice

