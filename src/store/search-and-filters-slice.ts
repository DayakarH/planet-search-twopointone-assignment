import type { Filters } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const getInitialState = (): Filters => {
  if (typeof window === "undefined")
    return { searchText: "", filters: { color: [], shape: [], size: [] } };

  const params = new URLSearchParams(window.location.search);
  return {
    searchText: params.get("q") || "",
    filters: {
      color: params.getAll("color"),
      shape: params.getAll("shape"),
      size: params.getAll("size"),
    },
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
  },
});

export const { setSearchText, setFilters } = searchAndFiltersSlice.actions;
export default searchAndFiltersSlice.reducer;
