import React from "react";

const ImageModal = ({ selectedImage, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: "9999",
        backgroundColor: "#00000098",
      }}
    >
      {selectedImage && (
        <div
          style={{ backgroundColor: "white", width: "70%", padding: "1% 2%" }}
        >
          <p
            style={{ cssFloat: "right", cursor: "pointer", fontSize: "20px" }}
            onClick={onClose}
          >
            X
          </p>
          <img
            width={"40%"}
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
            <a
              href={selectedImage.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedImage.url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageModal;
