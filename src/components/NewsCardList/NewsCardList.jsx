import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ articles }) {
  return (
    <section className="news-card-list">
      {articles.map((article) => (
        <NewsCard key={article._id} article={article} />
      ))}
    </section>
  );
}

export default NewsCardList;
