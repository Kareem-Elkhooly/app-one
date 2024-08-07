import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  initialState: [],
  name: "cartSlice",
  reducers: {
    AddToCart: (state, action) => {
      if (action.payload.product) {
        const findProduct = state.find(
          (product) => product.id === action.payload.product.id
        );
        if (findProduct) {
          findProduct.count += 1;
          if (findProduct.details) {
            const findDetails = findProduct.details.find(
              (details) =>
                details[0] === action.payload.details[0] &&
                details[1] === action.payload.details[1]
            );
            if (findDetails) {
              findDetails[2] += 1;
            } else {
              findProduct.details.push(action.payload.details);
            }
          } else {
            findProduct.details = [action.payload.details];
          }
        } else {
          const productClone = {
            ...action.payload.product,
            count: 1,
            details: [action.payload.details],
          };
          state.push(productClone);
        }
      } else {
        const findProduct = state.find(
          (product) => product.id === action.payload.id
        );
        if (findProduct) {
          findProduct.count += 1;
        } else {
          const productClone = { ...action.payload, count: 1 };
          state.push(productClone);
        }
      }
    },

    RemoveItemFromCart: (state, action) => {
      if (action.payload.product) {
        const findProduct = state.find(
          (product) => product.id === action.payload.product.id
        );
        if (findProduct && findProduct.count !== 0) {
          const findDetails = findProduct.details.find(
            (details) =>
              details[0] === action.payload.details[0] &&
              details[1] === action.payload.details[1]
          );
          if (findDetails && findDetails[2] !== 0) {
            findProduct.count -= 1;
            findDetails[2] -= 1;
          }
        }
      } else {
        const findProduct = state.find(
          (product) => product.id === action.payload.id
        );
        if (findProduct && findProduct.count !== 0) {
          findProduct.count -= 1;
        }
      }
    },
    RemoveFromCart: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
    Clear: (state, action) => {
      return [];
    },
  },
});

export const { AddToCart, RemoveFromCart, Clear, RemoveItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
