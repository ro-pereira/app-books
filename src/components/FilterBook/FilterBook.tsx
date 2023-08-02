import { useSelector } from "react-redux";
import { handleChangeValueFilter } from "../../store/Slices/BookListSlice";
import { useAppDispatch } from "../../store/hook";
import { RootState } from "../../store/store";
import "./filterBook.sass";
import { IFilterBookProps } from "../../interface";

const FilterBook =  ({ items, type }: IFilterBookProps) => {
    const dispatch = useAppDispatch();

    const { readingOption, generSearch } = useSelector(
      (state: RootState) => state.books.filterOptions
    );
  
    const handleChangeInput = (option: string) => {
      if (type === "Gerer") {
        dispatch(
          handleChangeValueFilter({
            type: "generSearch",
            value: option,
          })
        );
      }
  
      if (type === "Reading options") {
        dispatch(
          handleChangeValueFilter({
            type: "optionReading",
            value: option,
          })
        );
      }
    };
  
    const handleSelectOptionColor = (option: string) => {
      if (option === readingOption || option === generSearch) {
        return "color-select";
      }
      return "";
    };
  
    return (
      <>
        <span className="listFilter__span">{type}:</span>
  
        <ul>
          {items.map((item) => {
            return (
              item !== "empty" && (
                <li
                  key={item}
                  onClick={() => handleChangeInput(item)}
                  className={handleSelectOptionColor(item)}
                >
                  {item}
                </li>
              )
            );
          })}
        </ul>
      </>
    );
}

export default FilterBook