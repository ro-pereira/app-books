import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/exports";
import dropdownIcon from "../../assets/arrow-down.png";
import iconFilterWhite from "../../assets/icon-filter-white.png";
import iconTrash from "../../assets/icon-trash.png";
import iconFilter from "../../assets/icons-filter.png";
import { allBooksList, cleanFilter } from "../../store/Slices/BookListSlice";
import { useAppDispatch } from "../../store/hook";
import ButtonWithImage from "../ButtonWithImage/ButtonWithImage.";
import FilterBook from "../FilterBook/FilterBook";
import SearchBook from "../SearchBook/SearchBook";
import "./navBar.sass";

const NavBar = () => {
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const [geners, setGeners] = useState<string[]>([]);
  const { books, readingOptions, filterOptions } = useSelector(allBooksList);
  const [showMoreGerers, setShowMoreGerers] = useState(10);
  const { readingOption, generSearch } = filterOptions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listCategoriesArray = books.map((e) =>
      e.genre_list.split(",", e.genre_list.length)
    );

    const listAllCategiries = listCategoriesArray.reduce(
      (acc, array) => [...acc, ...array],
      []
    );

    const uniqueListCategories = listAllCategiries.filter(
      (item, index) => listAllCategiries.indexOf(item) === index
    );

    const showGeners = uniqueListCategories.filter((e, index) => {
      if (index < showMoreGerers) {
        return e;
      }

      return undefined;
    });

    setGeners(showGeners);
  }, [books, showMoreGerers]);

  useEffect(() => {
    if (!showNavigation) setShowMoreGerers(10);
  }, [showNavigation]);

  const handleMoreGerer = () => {
    if (showMoreGerers < books.length) {
      setShowMoreGerers((state) => state + 10);
    } else {
      setShowMoreGerers(10);
    }
  };

  const handleImages = (
    activeImage: string | undefined,
    inactiveImage?: string | undefined,
    title?: string
  ): string | undefined => {
    if (title === "filter") {
      if (!showNavigation) {
        return inactiveImage;
      }
    }

    return activeImage;
  };

  const handleCleanFiters = () => {
    dispatch(cleanFilter());
  };

  const handleShowNavigation = () => {
    setShowNavigation(!showNavigation);
  };

  const handleStyleButtonFilter = () => {
    if (showNavigation) {
      return "navBar__buttton__active";
    }

    return "navBar__buttton";
  };

  return (
    <nav className="navBar">
      <div className="navBar__filters-input">
        <SearchBook />

        <div className="navBar__button-filter">
          <ButtonWithImage
            title="Filter"
            handleActions={handleShowNavigation}
            handleImages={handleImages(iconFilterWhite, iconFilter, "filter")}
            styleButton={handleStyleButtonFilter()}
          />
        </div>
      </div>

      {showNavigation && (
        <>
          {(generSearch !== "" || readingOption !== "") && (
            <ButtonWithImage
              title="Remove filters"
              handleActions={handleCleanFiters}
              handleImages={handleImages(iconTrash)}
              styleButton="remove-filter"
            />
          )}

          <div className="navBar__filter-box">
            <div className="navBar__filter-box__reading-options">
              <FilterBook items={readingOptions} type="Reading options" />
            </div>
            <div className="navBar__filter-box__geners">
              <FilterBook items={geners} type="Gerer" />
              <ButtonWithImage
                title={
                  books.length === showMoreGerers
                    ? "show less genres"
                    : "show more genres"
                }
                handleActions={handleMoreGerer}
                handleImages={handleImages(dropdownIcon)}
                styleButton={
                  books.length === showMoreGerers
                    ? "less__geners"
                    : "more__geners"
                }
              />
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
