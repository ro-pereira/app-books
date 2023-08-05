import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IBooksResponse } from "../../interface";
import { allBooksList, fetchBooks } from "../../store/Slices/BookListSlice";
import { useAppDispatch } from "../../store/hook";
import Card from "../Card/Card";
import "./container.sass";
import Modal from "../Modal/Modal";

const Container = () => {
  const dispatch = useAppDispatch();
  const { books, filterOptions, status } = useSelector(allBooksList);
  const [allBooks, setAllBooks] = useState<IBooksResponse[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const { inputValue, generSearch, readingOption } = filterOptions;

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    setAllBooks(books);
  }, [books]);

  const filteredBooks = useMemo(() => {
    let filtered = [...books];

    const findInputChange = (book: IBooksResponse[]) => {
      return book.filter(
        (book) =>
          book.title.toLowerCase().includes(inputValue.toLowerCase()) ||
          book.authors.toLowerCase().includes(inputValue.toLowerCase())
      );
    };

    const findChosenGere = (book: IBooksResponse[]) => {
      return book.filter((e) =>
        e.genre_list
          .split(",", e.genre_list.length)
          .find((e) => e === generSearch)
      );
    };

    const findChosenOption = (book: IBooksResponse[]) => {
      return book.filter((e) => e.bookmark === readingOption);
    };

    if (inputValue && generSearch && readingOption) {
      return findInputChange(findChosenGere(findChosenOption(filtered)));
    }

    if (inputValue && generSearch) {
      return findChosenGere(findInputChange(filtered));
    }

    if (inputValue && readingOption) {
      return findInputChange(findChosenOption(filtered));
    }

    if (generSearch && readingOption) {
      return findChosenGere(findChosenOption(filtered));
    }

    if (inputValue) {
      return findInputChange(filtered);
    }
    //
    if (generSearch) {
      return findChosenGere(filtered);
    }

    if (readingOption) {
      return findChosenOption(filtered);
    }

    return filtered;
  }, [books, inputValue, generSearch, readingOption]);

  useEffect(() => {
    setAllBooks(filteredBooks);
  }, [filteredBooks]);

  if (status === "loading" || status === "failed") {
    return (
      <div className="container__loading">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <Card allBooks={allBooks} setSelectedBookId={setSelectedBookId} />
      <Modal
        selectedBookId={selectedBookId}
        allBooks={allBooks}
        setSelectedBookId={setSelectedBookId}
      />
    </div>
  );
};

export default Container;
