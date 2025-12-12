import React, { useState } from "react";
import "./NewsCard.css";

function NewsCard({
  article = {},
  onSave = () => {},
  onDelete = () => {},
  isLoggedIn = false,
  isSavedNewsPage = false,
  savedArticles = [],
}) {
  const saved = savedArticles.some(
    (savedArticle) => savedArticle.title === article.title,
  );

  const [imageError, setImageError] = useState(false);

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const btnClassName = isSavedNewsPage
    ? "news-card__delete-btn"
    : `news-card__save-btn ${saved ? "news-card__save-btn-saved" : ""}`;

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSavedNewsPage) {
      onDelete(article);
    } else {
      if (!isLoggedIn) return;
      onSave(article, !saved);
    }
  };

  return (
    <article className="news-card">
      <div className="news-card__media">
        {article.urlToImage && !imageError ? (
          <a
            href={article.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={article.urlToImage}
              alt={article.title || "News image"}
              className="news-card__image"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          </a>
        ) : (
          <div className="news-card__placeholder">No image available</div>
        )}

        {isSavedNewsPage && article.keyword && (
          <div className="news-card__keyword">
            {article.keyword.charAt(0).toUpperCase() + article.keyword.slice(1)}
          </div>
        )}

        <button
          type="button"
          className={btnClassName}
          onClick={handleSaveClick}
          aria-label={
            isSavedNewsPage
              ? "Remove from saved"
              : saved
                ? "Unsave article"
                : "Save article"
          }
          aria-pressed={saved}
        >
          {!isLoggedIn && !isSavedNewsPage && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          {isSavedNewsPage && (
            <span className="news-card__tooltip">Remove from saved</span>
          )}
        </button>
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formattedDate}</p>
        <a
          href={article.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card__title-link"
        >
          <h3 className="news-card__title">{article.title || "No title"}</h3>
        </a>
        <p className="news-card__description">{article.description || ""}</p>
        <p className="news-card__source">{article.source?.name || ""}</p>
      </div>
    </article>
  );
}

export default NewsCard;
