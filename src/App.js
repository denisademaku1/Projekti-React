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
    
        
      </nav>


      <h1>Wallhaven Wallpaper Search</h1>


      <SearchWallpaper category={searchCategory} />
    </div>
  );
}

export default App;
