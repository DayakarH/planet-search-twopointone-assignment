import { configureStore } from "@reduxjs/toolkit";
import searchAndFiltersSlice from "./search-and-filters-slice";

const store = configureStore({
  reducer: {
    searchAndFiltersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
