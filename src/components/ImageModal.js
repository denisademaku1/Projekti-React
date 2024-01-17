import React from "react";

const ImageModal = ({ selectedImage }) => {
  return (
    <div className="w-100">
      <img
        width={"100%"}
        src={selectedImage.thumbs.original}
        alt={`Thumbnail for ${selectedImage.id}`}
      />
      <p>Date: {selectedImage.created_at}</p>
      <p>Category: {selectedImage.category}</p>
      <p>Purity: {selectedImage.purity}</p>
      <p>Size: {selectedImage.file_size} bytes</p>
      <p>Views: {selectedImage.views}</p>
      <p>Favorites: {selectedImage.favorites}</p>
      <p>
        Link:{" "}
        <a href={selectedImage.url} target="_blank" rel="noopener noreferrer">
          {selectedImage.url}
        </a>
      </p>
    </div>
  );
};

export default ImageModal;
