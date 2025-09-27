// toolkit/store.ts
import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "./clientSlice";
import favoriteSlice from "./FavoriteSlice";

export const store = configureStore({
  reducer: {
    favorite: favoriteSlice,
    clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
