import { useEffect, useState } from "react";
import { allBooksList, fetchBooks } from "../../store/Slices/BookListSlice";
import { useAppDispatch } from "../../store/hook";
import "./home.sass";
import { IBooksResponse } from "../../interface";
import { useSelector } from "react-redux";

const Home = () => {
  const [allBooks, setAllBooks] = useState<IBooksResponse[]>([]);
  const dispatch = useAppDispatch();

  const { books } = useSelector(allBooksList);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    setAllBooks(books);
  }, [books]);

  console.log(allBooks);
  

  return (
    <>
      <main className="home">home</main>
    </>
  );
};

export default Home;
