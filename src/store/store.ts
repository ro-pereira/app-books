import { configureStore } from "@reduxjs/toolkit";
import bookslistSlice from "./Slices/BookListSlice";

export const store = configureStore({
  reducer: {
    books: bookslistSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
