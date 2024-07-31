import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlicer";

export const store = configureStore({
  reducer: {
    question: questionReducer,
  },
});
