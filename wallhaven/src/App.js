import React, { useState } from 'react';
import SearchForm from './SearchForm';
import ImageList from './ImageList';
import ImageModal from './ImageModal';
import fetchWallpapers from './api';

const App = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async ({ query, sorting, order, resolution }) => {
    try {
      const wallpapersData = await fetchWallpapers(query, sorting, order, resolution);
      setWallpapers(wallpapersData);
    } catch (error) {
      console.error('Error searching for wallpapers:', error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <ImageList images={wallpapers} onImageClick={handleImageClick} />
      {selectedImage && (
        <ImageModal imageUrl={selectedImage.originalUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
