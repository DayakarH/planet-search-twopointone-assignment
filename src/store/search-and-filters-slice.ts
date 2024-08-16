import type { SearchAndFilters } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type SearchAndFiltersSlice = SearchAndFilters & { anyFilterSelected: boolean };

const initialState: SearchAndFiltersSlice = {
  searchText: "",
  filters: { color: [], shape: [], size: [] },
  anyFilterSelected: false,
};
const getInitialState = (): SearchAndFiltersSlice => {
  if (typeof window === "undefined") return initialState;

  const params = new URLSearchParams(window.location.search);
  return {
    searchText: params.get("q") || "",
    filters: {
      color: params.getAll("color"),
      shape: params.getAll("shape"),
      size: params.getAll("size"),
    },
    anyFilterSelected: params.size > 0,
  };
};
const searchAndFiltersSlice = createSlice({
  name: "search-and-filters",
  initialState: getInitialState(),
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setAnyFiltersSelected: (state, action) => {
      state.anyFilterSelected = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setSearchText,
  setFilters,
  setAnyFiltersSelected,
  resetFilters,
} = searchAndFiltersSlice.actions;
export default searchAndFiltersSlice.reducer;
