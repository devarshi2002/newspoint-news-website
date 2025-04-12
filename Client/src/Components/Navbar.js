import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to the search page with the query string
      navigate(`/search/${searchTerm}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo'); // Clear user data from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <strong>NewsPoint</strong>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/category/general">General</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/category/business">Business</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/category/sports">Sports</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/category/science">Science</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/category/health">Health</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/category/entertainment">Entertainment</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/category/technology">Technology</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/bookmarks">Bookmarks</Link></li>
          </ul>
          
          {/* Search Form */}
          <form className="d-flex ms-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">Search</button>
          </form>

          {/* Logout SVG Icon */}
          <button 
            className="btn btn-outline-light ms-3" 
            onClick={handleLogout} 
            aria-label="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
              <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>
          </button>
        </div>  
      </div>
    </nav>
  );
};

export default Navbar;
