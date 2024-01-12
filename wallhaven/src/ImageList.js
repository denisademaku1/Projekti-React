import React from 'react';

const ImageList = ({ images, onImageClick }) => {
  return (
    <div>
      {images.map((image) => (
        <img
          key={image.id}
          src={image.thumbnailUrl}
          alt={image.id}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
};

export default ImageList;