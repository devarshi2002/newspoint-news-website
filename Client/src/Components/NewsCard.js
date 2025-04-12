import React, { useState, useEffect } from 'react';

const NewsCard = ({ news }) => {
  const description = news.description || "No description available."; // Default description if null or undefined

  // State to track if the news is bookmarked
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Check if this news article is already bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const isAlreadyBookmarked = bookmarks.some(item => item.url === news.url);
    setIsBookmarked(isAlreadyBookmarked);
  }, [news.url]);

  // Handle bookmark action
  const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    const isAlreadyBookmarked = bookmarks.some(item => item.url === news.url);

    if (isAlreadyBookmarked) {
      // Remove from bookmarks if already bookmarked
      bookmarks = bookmarks.filter(item => item.url !== news.url);
      setIsBookmarked(false);
    } else {
      // Add to bookmarks if not already bookmarked
      bookmarks.push(news);
      setIsBookmarked(true);
    }

    // Save updated bookmarks to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card shadow-sm h-100 position-relative">
        <img src={news.urlToImage || 'https://via.placeholder.com/300'} className="card-img-top" alt="News" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{news.title}</h5>
          <p className="card-text">
            {description.length > 150 ? `${description.slice(0, 150)}...` : description}
          </p>
          <div className="mt-auto">
            {/* Align buttons in the footer */}
            <div className="d-flex justify-content-between align-items-center">
              <a href={news.url} className="btn btn-outline-dark" target="_blank" rel="noopener noreferrer">
                Read More <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
              </a>
              {/* Bookmark Button */}
              <span onClick={handleBookmark} style={{ cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={isBookmarked ? 'gold' : 'currentColor'} className="bi bi-bookmarks" viewBox="0 0 16 16">
                  <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1z"/>
                  <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
