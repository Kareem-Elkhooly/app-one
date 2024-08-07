import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  initialState: [],
  name: "commentsSlice",
  reducers: {
    AddToComments: (state, action) => {
      const findComment = state.find(
        (comment) => comment.commentID === action.payload.commentID
      );
      if (findComment === undefined) {
        const commentClone = { ...action.payload };
        state.push(commentClone);
      }
    },
  },
});

export const { AddToComments } = commentsSlice.actions;

export default commentsSlice.reducer;
