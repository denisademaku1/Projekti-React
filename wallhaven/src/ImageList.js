import React from 'react';
import './ImageList.css';

const ImageList = ({ images, onImageClick }) => {
  return (
    <div className="image-list">
      {images.map((image) => (
        <img
          key={image.id}
          src={image.thumbs.large}
          alt={image.id}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
};

export default ImageList;
