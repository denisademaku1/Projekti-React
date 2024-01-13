import React, { useState } from 'react';
import SearchWallpaper from './SearchWallpaper';
import logo from './img/logo.png';

function App() {
  const [searchCategory, setSearchCategory] = useState('latest');

  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            width="250"
            height="80"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                className="nav-link"
                href="#"
                onClick={() => setSearchCategory('latest')}
              >
                Latest
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setSearchCategory('most_viewed')}
              >
                Most Viewed
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={() => setSearchCategory('toplist')}
              >
                Toplist
              </a>
            </li>
          </ul>
        </div>
      </nav>


      <h1>Wallhaven Wallpaper Search</h1>


      <SearchWallpaper category={searchCategory} />
    </div>
  );
}

export default App;
