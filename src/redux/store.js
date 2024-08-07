import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import productsSlice from "./slices/products-slice";
import commentsSlice from "./slices/comments-slice";
import favoriteSlice from "./slices/favorite-slice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    comments: commentsSlice,
    favorite: favoriteSlice,
  },
});
