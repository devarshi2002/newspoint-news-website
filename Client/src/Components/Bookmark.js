import React, { useEffect, useState } from 'react';
import NewsCard from '../Components/NewsCard';

const Bookmarks = () => {
  const [bookmarkedNews, setBookmarkedNews] = useState([]);

  useEffect(() => {
    // Retrieve bookmarked news from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarkedNews(bookmarks); // Set the state with the bookmarked news
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-white mb-4 text-center">Bookmarked News</h2>
      <div className="row">
        {bookmarkedNews.length > 0 ? (
          bookmarkedNews.map((news, index) => <NewsCard key={index} news={news} />)
        ) : (
          <p className="text-white">No bookmarked news yet!</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
