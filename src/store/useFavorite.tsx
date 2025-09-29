import { create } from "zustand";

export interface ICourse {
  id: number;
  title: string;
  description: string;
  course_img: string;
  price: number;
  time: string;
  count_lessons: number;
  category: number;
  owner: number;
  status_role: string;
}

interface FavoriteState {
  favorites: ICourse[];
  addToFavorite: (course: ICourse) => void;
  removeFromFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavorite = create<FavoriteState>((set, get) => ({
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),

  addToFavorite: (course) => {
    const { favorites } = get();
    if (!favorites.some((el) => el.id === course.id)) {
      const updated = [...favorites, course];
      set({ favorites: updated });
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  },

  removeFromFavorite: (id) => {
    const { favorites } = get();
    const updated = favorites.filter((el) => el.id !== id);
    set({ favorites: updated });
    localStorage.setItem("favorites", JSON.stringify(updated));
  },

  isFavorite: (id) => {
    return get().favorites.some((el) => el.id === id);
  },
}));
