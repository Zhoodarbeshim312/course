import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAvailable {
  id: number;
  owner: number;
  category: number;
  title: string;
  description: string;
  course_img: string;
  status_role: string;
  time: string;
  count_lessons: number;
  price: number;
}

interface IInitial {
  favorite: IAvailable[];
}

const savedFavorites = localStorage.getItem("favorite");

const initialState: IInitial = {
  favorite: savedFavorites ? JSON.parse(savedFavorites) : [],
};

export const favoriteSlice = createSlice({
  name: "FAVORITE",
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<IAvailable>) => {
      const exists = state.favorite.some((el) => el.id === action.payload.id);
      if (!exists) {
        state.favorite.push(action.payload);
      } else {
        state.favorite = state.favorite.filter(
          (el) => el.id !== action.payload.id
        );
      }
      localStorage.setItem("favorite", JSON.stringify(state.favorite));
    },
  },
});

export const { addToFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
