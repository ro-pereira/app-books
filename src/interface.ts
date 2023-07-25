import { Dispatch, SetStateAction } from "react";

export interface IBooksResponse {
  Quote1: string;
  Quote2: string;
  Quote3: string;
  authors: string;
  description: string;
  edition: string;
  format: string;
  genre_list: string;
  genres: string;
  id: number;
  image_url: string;
  num_pages: number;
  rating: number;
  rating_count: number;
  review_count: number;
  title: string;
  bookmark: "Read" | "Want to read" | "Currently reading" | "Empty";
}

export interface IBooksList {
  books: IBooksResponse[];
  status: string;
  error: null | string | undefined;
  readingOptions: string[];
}

export interface ICardProps {
  allBooks: IBooksResponse[];
  setSelectedBookId: Dispatch<SetStateAction<number | null>>;
}

export interface IDropboxProps {
  id: number
}

export interface IModalProps {
  allBooks: IBooksResponse[];
  selectedBookId: number | null;
  setSelectedBookId: Dispatch<SetStateAction<number | null>>;
}

export interface IChipProps {
  content: string;
  title: string;
  selectedOptionsTextType?: string;
}
