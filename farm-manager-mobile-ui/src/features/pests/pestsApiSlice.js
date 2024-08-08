import {
    createEntityAdapter
} from "@reduxjs/toolkit";
import { InfectionLevels_TAG, PestsStages_TAG, Pests_TAG, PlantParts_TAG, apiSlice } from "../../app/api/apiSlice";

export const adapter = createEntityAdapter()

export const pestsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({
        getPests: builder.query({
            query: (args) => `/api/farm/pests`,
            providesTags: [Pests_TAG]
        }),
        getPestStages: builder.query({
            query: (args) => `/api/farm/peststages`,
            providesTags: [PestsStages_TAG]
        }),
        getInfectionLevels: builder.query({
            query: (args) => `/api/farm/infectionlevels`,
            providesTags: [InfectionLevels_TAG]
        }),
        getPlantLocations: builder.query({
            query: (args) => `/api/farm/plantlocations`,
            providesTags: [PlantParts_TAG]
        }),

    }),

})

export const {
    useGetPestsQuery,
    useGetPestStagesQuery,
    useGetInfectionLevelsQuery,
    useGetPlantLocationsQuery,
} = pestsApiSlice

