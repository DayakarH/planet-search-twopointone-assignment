import type { FilterCategories } from "@/lib/types";
import {
  setAnyFiltersSelected,
  setFilters,
  setSearchText,
} from "@/store/search-and-filters-slice";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

export default function useUpdateSearchAndFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(
    (state) => state.searchAndFiltersSlice.filters,
  );
  const updateSearchTerm = useCallback(
    (value: string) => {
      dispatch(setSearchText(value));
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("q");
      if (value) {
        searchParams.append("q", value);
      }

      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({}, "", newUrl);
    },
    [dispatch],
  );
  const updateFilters = useCallback(
    (type: FilterCategories, id: string, checked: boolean) => {
      const newFilters = {
        ...filters,
        [type]: checked
          ? [...filters[type], id]
          : filters[type].filter((filterID) => filterID !== id),
      };
      console.log(newFilters);
      dispatch(setFilters(newFilters));
      dispatch(
        setAnyFiltersSelected(
          Object.values(newFilters).some((filter) => filter.length > 0),
        ),
      );

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(type);
      newFilters[type].forEach((id) => searchParams.append(type, id));

      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({}, "", newUrl);
    },
    [filters, dispatch],
  );

  return {
    updateFilters,
    updateSearchTerm,
  };
}
