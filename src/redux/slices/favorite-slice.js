import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  initialState: [],
  name: "favoriteSlice",
  reducers: {
    AddToFavorite: (state, action) => {
      const productClone = {
        ...action.payload,
        love: "love" + action.payload.id,
      };
      state.push(productClone);
    },
    RemoveFromFavorite: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
  },
});

export const { AddToFavorite, RemoveFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
