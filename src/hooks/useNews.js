import { useState, useEffect } from "react";
import axios from "axios";

const CACHE_KEY = "gnews_cache";
const CACHE_DURATION = 15 * 60 * 1000;

export const useNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setArticles(data);
          setLoading(false);
          return;
        }
      }

      const res = await axios.get(
        `https://gnews.io/api/v4/top-headlines?lang=en&max=10&token=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      const data = res.data.articles || [];
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
      setArticles(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch news");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filtered = articles
    .filter((a) => a.title?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.publishedAt) - new Date(a.publishedAt);
      if (sortBy === "source") return a.source.name.localeCompare(b.source.name);
      return 0;
    });

  return { articles: filtered, loading, error, search, setSearch, sortBy, setSortBy, refresh: fetchNews };
};
