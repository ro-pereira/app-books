import { useEffect, useState } from "react";
import { IBooksResponse, IModalProps } from "../../interface";
import Chip from "../Chip/Chip";
import Dropbox from "../Dropbox/Dropdown";
import "./modal.sass";

const optionsTextTypes = ["description", "Quote1", "Quote2", "Quote3"];

const Modal = ({
  allBooks,
  selectedBookId,
  setSelectedBookId,
}: IModalProps) => {
  const [bookSelected, setBookSelected] = useState<
    IBooksResponse | undefined
  >();
  const [listGeners, setListGeners] = useState<string[] | undefined>();
  const [selectedOptionsTextTypes, setSelectedOptionsTextTypes] =
    useState<string>("description");
  let propertyName: keyof IBooksResponse =
    selectedOptionsTextTypes as keyof IBooksResponse;

  useEffect(() => {
    const findBook = allBooks.find((e) => e.id === selectedBookId);
    setBookSelected(findBook);
    
  }, [allBooks, selectedBookId]);

  const handleCloseModal = () => {
    setSelectedBookId(null);
    setSelectedOptionsTextTypes("description");
  };

  useEffect(() => {
    const generateGenreList = bookSelected?.genre_list.split(
      ",",
      bookSelected?.genre_list.length
    );
    const body = document.querySelector("body");

    if (body) {
      if (bookSelected !== undefined) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflowY = "scroll";
      }
    }

    setListGeners(generateGenreList);
  }, [bookSelected, setListGeners]);

  return (
    <>
      {bookSelected !== undefined && (
        <div className="modal__backdrop" onClick={() => handleCloseModal()}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="modal__content__img">
              <img src={bookSelected.image_url} alt={bookSelected.title} />
              <div className="modal__content__img__bookmark" />
              <div className="modal__content__img__geners">
                {listGeners?.map((gener, index) => {
                  return <Chip key={index} content={gener} title="gener" />;
                })}
              </div>
            </div>

            <div className="modal__content__information">
              <div>
                <Dropbox id={bookSelected.id}></Dropbox>
              </div>
              <div className="modal__content__information__title">
                <div className="modal__content__information__title-authors">
                  <h1>{bookSelected.title}</h1>
                  <span>{bookSelected.authors}</span>
                </div>

                <div className="modal__content__information__title__pages-rating">
                  <span>Páginas: {bookSelected.num_pages}</span>
                  <span>{bookSelected.rating}</span>
                </div>
              </div>

              <div className="modal__content__information__description">
                <span className="modal__content__information__description__span">
                  {bookSelected[propertyName]}
                </span>
              </div>

              <div className="modal__content__information__text-Types">
                {optionsTextTypes?.map((textType, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedOptionsTextTypes(textType)}
                    >
                      <Chip
                        content={textType}
                        title="textTypes"
                        selectedOptionsTextType={selectedOptionsTextTypes}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
