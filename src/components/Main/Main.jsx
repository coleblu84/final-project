import "./Main.css";
import { useState } from "react";
import mainPagePic from "../../assets/main-page-pic.jpg";

function Main({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    onSearch(searchTerm);
  };

  return (
    <section className="main">
      <div
        className="main__hero"
        style={{ backgroundImage: `url(${mainPagePic})` }}
      >
        <div className="main__content">
          <h1 className="main__title">What&apos;s going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>

          <form className="main__search-form" onSubmit={handleSubmit}>
            <input
              className="main__search-input"
              type="text"
              placeholder="Enter topic"
              value={searchTerm}
              required
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="main__search-btn" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Main;
