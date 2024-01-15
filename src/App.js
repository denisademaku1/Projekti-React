import React, { useState } from "react";
import SearchWallpaper from "./SearchWallpaper";
import "./style.css";

function App() {
  const [searchCategory, setSearchCategory] = useState("latest");

  return (
    <div>
      <SearchWallpaper category={searchCategory} />
    </div>
  );
}

export default App;
