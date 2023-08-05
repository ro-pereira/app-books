import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dropdownIcon from "../../assets/arrow-down.png";
import checkMark from "../../assets/check-mark.png";
import { IDropdownProps } from "../../interface";
import { allBooksList, alreadyRead } from "../../store/Slices/BookListSlice";
import { useAppDispatch } from "../../store/hook";
import "./dropdown.sass";

const Dropdown = ({ id }: IDropdownProps) => {
  const { books } = useSelector(allBooksList);
  const [showDropdownId, setShowDropdownId] = useState<null | number>(null);
  const [selectedOption, setSelectedOption] = useState("empty");
  const { readingOptions } = useSelector(allBooksList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filterSelection = books.find((e) => id === e.id);
    if (filterSelection) setSelectedOption(filterSelection.bookmark);
  }, [books, id]);

  useEffect(() => {
    if (showDropdownId)
      dispatch(alreadyRead({ id: showDropdownId, bookmark: selectedOption }));
  }, [dispatch, selectedOption, showDropdownId]);

  const toggleOpenDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.stopPropagation();
    if (id === showDropdownId) {
      setShowDropdownId(null);
      return;
    }
    setShowDropdownId(id);
  };

  const handleChooseOptions = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: string
  ) => {
    e.stopPropagation();
    setSelectedOption(option);
  };

  return (
    <div>
      <button
        id="button"
        className={`dropdown__button  ${showDropdownId === id ? "active" : "inactive"}`}
        onClick={(e) => toggleOpenDropdown(e, id)}
      >
        <img src={dropdownIcon} alt="bookmark" />
      </button>

      {showDropdownId && (
        <div className="dropdown">
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

export default Dropdown;
