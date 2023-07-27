import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBooksList } from "../../interface";
import { RootState } from "../store";

export const fetchBooks = createAsyncThunk("bookslist/fetchBooks", async () => {
  const response = await fetch(
    "https://example-data.draftbit.com/books?_limit=50"
  );
  const data = await response.json();
  return data;
});

const initialState: IBooksList = {
  books: [],
  status: "idle",
  error: null,
  readingOptions: ["Read", "Want to read", "Currently reading", "empty"],
  filterOptions: {
    inputValue: "",
    generSearch: "",
    readingOption: "",
  },
};

const bookslistSlice = createSlice({
  name: "booksList",
  initialState,
  reducers: {
    alreadyRead: (state, action) => {
      const filterBook = state.books.find(
        (book) => book.id === action.payload.id
      );

      if (!filterBook) {
        throw new Error("Book not find");
      }

      filterBook.bookmark = action.payload.bookmark;
    },
    handleChangeValueFilter: (state, action) => {
      const { type, value } = action.payload;
      const { filterOptions } = state;

      if (type === "inputValue") {
        filterOptions.inputValue = value;
      }

      if (type === "optionReading") {
        filterOptions.readingOption = value;
      }

      if (type === "generSearch") {
        filterOptions.generSearch = value;
      }
    },
    cleanFilter: (state) => {
      state.filterOptions = {
        inputValue: "",
        generSearch: "",
        readingOption: "",
      };
    },
  },
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

export const { alreadyRead, handleChangeValueFilter, cleanFilter } = bookslistSlice.actions;
export const allBooksList = (state: RootState) => state.books;
export default bookslistSlice;
