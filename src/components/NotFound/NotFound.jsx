import "./NotFound.css";
import NotFoundPic from "../../assets/not-found-pic.svg";

function NotFound() {
  return (
    <div className="not-found">
      <img src={NotFoundPic} alt="Nothing Found" className="not-found__pic" />
      <h2 className="not-found__title">Nothing found</h2>
      <p className="not-found__text">
        Sorry, but nothing matched <br /> your search terms.
      </p>
    </div>
  );
}

export default NotFound;
