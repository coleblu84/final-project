const NEWS_API_BASE_URL = import.meta.env.PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

/**
 * Search news articles by a query (last 7 days)
 * @param {string} query
 * @returns {Promise<Array>}
 */
export const searchNews = async (query) => {
  if (!query.trim()) return [];

  // --- Compute dates (from = 7 days ago, to = today) ---
  const today = new Date();
  const prior = new Date();
  prior.setDate(today.getDate() - 7);

  const format = (date) => date.toISOString().split("T")[0]; // yyyy-mm-dd

  const from = format(prior);
  const to = format(today);

  // --- Build URL with required parameters ---
  const url = `${NEWS_API_BASE_URL}?q=${encodeURIComponent(query)}&from=${from}&to=${to}&sortBy=publishedAt&pageSize=100&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error("News API HTTP error:", response.status);
      return [];
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("News API fetch error:", error);
    return [];
  }
};
