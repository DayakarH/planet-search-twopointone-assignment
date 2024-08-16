import {
  type FilterOption,
  type Planet,
  type SearchAndFilters,
} from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const planetsAPI = createApi({
  reducerPath: "planetsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    searchPlanets: builder.query<Array<Planet>, SearchAndFilters>({
      query: ({ searchText, filters }) => {
        const params = new URLSearchParams();
        if (searchText)
          params.append("name", capitalizeFirstLetter(searchText));
        Object.entries(filters).forEach(([key, values]) => {
          values.forEach((value) => params.append(key, value));
        });
        return `planets?${params.toString()}`;
      },
    }),
    getColorOptions: builder.query<Array<FilterOption>, void>({
      query: () => "colors",
    }),
    getShapeOptions: builder.query<Array<FilterOption>, void>({
      query: () => "shapes",
    }),
    getSizeOptions: builder.query<Array<FilterOption>, void>({
      query: () => "sizes",
    }),
  }),
});

export const {
  useSearchPlanetsQuery,
  useGetColorOptionsQuery,
  useGetShapeOptionsQuery,
  useGetSizeOptionsQuery,
} = planetsAPI;
