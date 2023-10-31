import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


export const warehousesAdapter = createEntityAdapter()

const initialState = warehousesAdapter.getInitialState()


export const warehousesApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getWarehouses: builder.query({

            query: (args) => `/api/farm/warehouses`,
            providesTags: ['Warehouses']
        }),
    
    })
})

export const {
    useGetWarehousesQuery,
} = warehousesApiSlice


export const selectWarehousesResult = warehousesApiSlice.endpoints.getWarehouses.select()

export const getWarehousesState = (state) => state;
