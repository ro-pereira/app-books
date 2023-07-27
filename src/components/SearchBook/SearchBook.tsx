import { useSelector } from "react-redux";
import { handleChangeValueFilter } from "../../store/Slices/BookListSlice";
import { useAppDispatch } from "../../store/hook";
import { RootState } from "../../store/store";
import "./searchBook.sass";

const SearchBook = () => {
  const dispatch = useAppDispatch();
  const { inputValue } = useSelector(
    (state: RootState) => state.books.filterOptions
  );

  const handleInputChange = (e: { target: { value: string } }) => {
    dispatch(
      handleChangeValueFilter({
        type: "inputValue",
        value: e.target.value,
      })
    );
  };

  return (
    <div className="search">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="search..."
      />
    </div>
  );
};

export default SearchBook;
