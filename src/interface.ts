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
}

export interface ICardProps {
  allBooks: IBooksResponse[];
}
