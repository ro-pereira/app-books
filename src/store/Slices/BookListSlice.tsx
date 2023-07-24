import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IBooksList } from "../../interface";

export const fetchBooks = createAsyncThunk("bookslist/fetchBooks", async () => {
  const response = await fetch(
    "https://example-data.draftbit.com/books?_limit=10"
  );
  const data = await response.json();
  return data;
});

const initialState: IBooksList = {
  books: [],
  status: "idle",
  error: null,
};

const bookslistSlice = createSlice({
  name: "booksList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload.map((book: IBooksList) => ({
          ...book,
          bookmark: "empty",
        }));
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const allBooksList = (state: RootState) => state.books;
export default bookslistSlice;
