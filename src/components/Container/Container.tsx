import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IBooksResponse } from "../../interface";
import { allBooksList, fetchBooks } from "../../store/Slices/BookListSlice";
import { useAppDispatch } from "../../store/hook";
import Card from "../Card/Card";
import "./container.sass";
import Modal from "../Modal/Modal";

const Container = () => {
  const dispatch = useAppDispatch();
  const { books } = useSelector(allBooksList);
  const [allBooks, setAllBooks] = useState<IBooksResponse[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    setAllBooks(books);
  }, [books]);

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
