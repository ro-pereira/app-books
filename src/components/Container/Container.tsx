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
  const { books, filterOptions } = useSelector(allBooksList);
  const [allBooks, setAllBooks] = useState<IBooksResponse[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const { inputValue } = filterOptions;

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

    if (inputValue) {
      return findInputChange(filtered);
    }

    return filtered;
  }, [books, inputValue]);

  useEffect(() => {
    setAllBooks(filteredBooks);
  }, [filteredBooks]);

  return (
    <div className="container">
      <Card allBooks={allBooks} setSelectedBookId={setSelectedBookId} />
      <Modal
        selectedBookId={selectedBookId}
        allBooks={allBooks}
        setSelectedBookId={setSelectedBookId}
      ></Modal>
    </div>
  );
};

export default Container;
