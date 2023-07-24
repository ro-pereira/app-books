import { ICardProps } from "../../interface";
import "./card.sass";

const Card = ({ allBooks }: ICardProps) => {
  return (
    <>
      {allBooks.map((book) => {
        return (
          <div className="card">
            <div
              className="card__bg"
              style={{ background: `url(${book.image_url}` }}
            ></div>

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
