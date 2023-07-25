import { ICardProps } from "../../interface";
import Dropbox from "../Dropbox/Dropbox";
import "./card.sass";

const Card = ({ allBooks }: ICardProps) => {
  return (
    <>
      {allBooks.map((book) => {
        return (
          <div className="card" key={book.id}>
            <div
              className="card__img"
              style={{ background: `url(${book.image_url}` }}
            >
              <Dropbox id={book.id} />
            </div>

            <div className="card__title">
              <h1>{book.title}</h1>
              <span>{book.authors}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
