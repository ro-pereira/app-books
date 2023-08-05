import { Link } from "react-router-dom";
import "./pageNotFound.sass";
import iconPageNotFound from "../../assets/page-not-found.png";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <img src={iconPageNotFound} alt="" />
      <div className="pageNotFound__link">
        <span>Page not found return to</span>
        <Link to="/home">Home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
