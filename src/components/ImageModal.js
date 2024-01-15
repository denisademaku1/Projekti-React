import React from "react";

const ImageModal = ({ selectedImage }) => {
  return (
    <div>
      <img
        src={selectedImage.path}
        alt={selectedImage.id}
        className="img-fluid"
      />
      <p>Uploader: {selectedImage.uploader}</p>
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
      <p>
        Thumbnail:{" "}
        <img
          src={selectedImage.thumbs.original}
          alt={`Thumbnail for ${selectedImage.id}`}
        />
      </p>
    </div>
  );
};

export default ImageModal;
