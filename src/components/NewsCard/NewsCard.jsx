function NewsCard({ article, isSavedPage = false }) {
  return (
    <article className="news-card">

      {/* Keyword badge (only visible on saved news page) */}
      {isSavedPage && (
        <div className="news-card__keyword">{article.keyword}</div>
      )}

      {/* Image section */}
      <div className="news-card__image-wrapper">
        <img
          className="news-card__image"
          src={article.image}
          alt={article.title}
        />

        {/* Save/Delete button overlay */}
        <button
          className={
            isSavedPage
              ? "news-card__delete-button"
              : "news-card__save-button"
          }
        ></button>

        {/* Tooltip (visible on hover on saved news page) */}
        {isSavedPage && (
          <span className="news-card__tooltip">Remove from saved</span>
        )}
      </div>

      {/* Text content */}
      <div className="news-card__content">
        <p className="news-card__date">
          {new Date(article.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <h3 className="news-card__title">{article.title}</h3>

        <p className="news-card__text">{article.text}</p>

        <p className="news-card__source">{article.source}</p>
      </div>
    </article>
  );
}

export default NewsCard;
