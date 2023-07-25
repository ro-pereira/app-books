import React, { useState } from "react";
import { useSelector } from "react-redux";
import dropdownIcon from "../../assets/arrow-down.png";
import checkMark from "../../assets/check-mark.png";
import { IDropboxProps } from "../../interface";
import { allBooksList, alreadyRead } from "../../store/Slices/BookListSlice";
import { useAppDispatch } from "../../store/hook";
import "./dropbox.sass";

const Dropbox = ({ id }: IDropboxProps) => {
  const [showDropbox, setShowDropbox] = useState<null | number>(null);
  const [selectedOption, setSelectedOption] = useState("empty");
  const { readingOptions } = useSelector(allBooksList);
  const dispatch = useAppDispatch();

  const toggleOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    if (id === showDropbox) {
      setShowDropbox(null);
      return;
    }
    setShowDropbox(id);
  };

  const handleChooseOptions = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: string
  ) => {
    e.stopPropagation();

    dispatch(alreadyRead({ id: id, bookmark: option }));
    setSelectedOption(option);
  };

  return (
    <div>
      <button
        id="button"
        className={showDropbox === id ? "active" : "inactive"}
        onClick={(e) => toggleOpen(e, id)}
      >
        <img src={dropdownIcon} alt="bookmark" />
      </button>

      {showDropbox && (
        <div className="dropbox">
          <ul>
            {readingOptions.map((option) => (
              <li
                key={option}
                className={`
                  ${
                    selectedOption === option
                      ? "li__selected"
                      : "li__deselected"
                  }
                  ${
                    option === "empty"
                      ? "li__empty-selected"
                      : "li__empty-deselected"
                  }
                `}
                onClick={(e) => handleChooseOptions(e, option)}
              >
                {option === "empty" ? "remove" : option}
                {selectedOption === option && option !== "empty" && (
                  <img src={checkMark} alt="check mark" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropbox;
