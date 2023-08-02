import { ICardProps } from "../../interface";
import Dropbox from "../Dropbox/Dropbox";
import "./card.sass";
import { allBooksList } from "../../store/Slices/BookListSlice";
import { useSelector } from "react-redux";

const Card = ({ allBooks, setSelectedBookId }: ICardProps) => {
  const { filterOptions } = useSelector(allBooksList);
  const { inputValue } = filterOptions;

  if (allBooks.length === 0) {
    return (
      <div className="bookNotFound">
        <span className="bookNotFound__inputValue">"{inputValue}"</span>
        <span>not found</span>
      </div>
    );
  }

  return (
    <>
      {allBooks.map((book) => {
        return (
          <div
            className="card"
            key={book.id}
            onClick={() => setSelectedBookId(book.id)}
          >
            <div
              className="card__img"
              style={{ background: `url(${book.image_url}` }}
            >
              <Dropbox id={book.id} />
            </div>

            <div className="card__title">
              <div className="card__title__box-blur" />
              <div className="card__title__content">
                <h1>{book.title}</h1>
                <span>{book.authors}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
