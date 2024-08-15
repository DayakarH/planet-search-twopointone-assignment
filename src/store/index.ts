import { configureStore } from "@reduxjs/toolkit";
import searchAndFiltersSlice from "./search-and-filters-slice";
import { planetsAPI } from "@/services/planets";

const store = configureStore({
  reducer: {
    searchAndFiltersSlice,
    [planetsAPI.reducerPath]: planetsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planetsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
