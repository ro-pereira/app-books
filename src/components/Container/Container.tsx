import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IBooksResponse } from "../../interface";
import { allBooksList, fetchBooks } from "../../store/Slices/BookListSlice";
import { useAppDispatch } from "../../store/hook";
import "./container.sass";
import Card from "../Card/Card";
const Container = () => {
  const [allBooks, setAllBooks] = useState<IBooksResponse[]>([]);
  const dispatch = useAppDispatch();

  const { books } = useSelector(allBooksList);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    setAllBooks(books);
  }, [books]);

  return (
    <div className="container">
      <Card allBooks={allBooks} />
    </div>
  );
};

export default Container;
