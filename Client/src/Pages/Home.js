import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../Components/NewsCard';
import Pagination from '../Components/Pagination';
import Footer from '../Components/Footer';
import { useParams } from 'react-router-dom';

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { searchTerm, category } = useParams(); // Get searchTerm and category from the URL

  const fetchNews = async (page, searchTerm, category) => {
    setLoading(true);
    try {
      let url = '';
      if (searchTerm) {
        // Fetch news based on search term
        url = `https://newsapi.org/v2/everything?q=${searchTerm}&pageSize=8&page=${page}&apiKey=8d6dedb24d734628a1329a29326328bd`;
      } else if (category) {
        // Fetch news based on category
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=8&page=${page}&apiKey=8d6dedb24d734628a1329a29326328bd`;
      } else {
        // Default to fetching top headlines if neither category nor searchTerm exists
        url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=8&page=${page}&from=2025-04-01&sortBy=publishedAt&apiKey=8d6dedb24d734628a1329a29326328bd`;
      }

      const response = await axios.get(url);
      setNewsData(response.data.articles);
      setTotalPages(Math.ceil(response.data.totalResults / 8)); // Calculate total pages
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset to first page when search term or category changes
    setCurrentPage(1);
    fetchNews(1, searchTerm, category); // Fetch news starting from page 1
  }, [searchTerm, category]); // Trigger fetch when searchTerm or category changes

  useEffect(() => {
    // Fetch news whenever the current page changes
    fetchNews(currentPage, searchTerm, category);
  }, [currentPage]); // Trigger fetch when currentPage changes

  return (
    <div className="dark-theme">
      <div className="container mt-5">
        {/* Dynamic Heading */}
        <h2 className="text-white mb-4 text-center">
          {searchTerm
            ? `Search Results for "${searchTerm}"`
            : category
            ? `News - Top ${category.charAt(0).toUpperCase() + category.slice(1)} Headline`
            : "News - Top Headlines"}
        </h2>

        <div className="row">
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            newsData.map((news, index) => <NewsCard key={index} news={news} />)
          )}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
