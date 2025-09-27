import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IProduct {
  url: string;
  name: string;
  price: string;
}

interface IInitial {
  favorite: IProduct[];
}

const initialState: IInitial = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: "FAVORITE",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<IProduct>) => {
      const exists = state.favorite.some(
        (el) => el.price === action.payload.price
      );
      if (!exists) {
        state.favorite.push(action.payload);
      } else {
        state.favorite = state.favorite.filter(
          (el) => el.price !== action.payload.price
        );
      }
    },
  },
});

export const { addToFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
