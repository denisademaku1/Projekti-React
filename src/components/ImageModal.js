import React from "react";
import User from "../img/user.jpeg";

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
          style={{
            backgroundColor: "white",
            width: "70%",
            padding: "1%",
            height: "80%",
            overflow: "auto",
            borderRadius: "10px",
          }}
        >
          <p
            style={{ cssFloat: "right", cursor: "pointer", fontSize: "20px" }}
            onClick={onClose}
          >
            X
          </p>
          <div
            style={{ padding: "1% 10%" }}
            className="d-flex align-item-center justify-content-between"
          >
            <div className="d-flex direction-row align-items-center gap-2">
              <div className="d-flex direction-row align-items-center gap-2">
                <img
                  width={25}
                  height={25}
                  style={{ borderRadius: "50%" }}
                  src={User}
                  alt={"John"}
                />
                <p className="mt-3">John Doe</p>
              </div>
            </div>
            <div className="d-flex direction-row gap-2">
              <p className="mt-3">
                <i class="fa fa-eye" /> {selectedImage.views}
              </p>
              <p className="mt-3">
                <i class="fa fa-heart" /> {selectedImage.favorites}
              </p>
            </div>
          </div>
          <img
            width={"80%"}
            src={selectedImage.thumbs.original}
            alt={`Thumbnail for ${selectedImage.id}`}
          />
          <div
            style={{ padding: "0 10%" }}
            className="w-100 d-flex mt-3 align-items-center justify-content-start"
          >
            {selectedImage.colors.map((item) => (
              <p
                style={{
                  backgroundColor: item,
                  height: "30px",
                  width: "10%",
                  border: ".5px solid black",
                }}
              ></p>
            ))}
          </div>
          <p>Date: {selectedImage.created_at}</p>
          <p>Category: {selectedImage.category}</p>
          <p>Purity: {selectedImage.purity}</p>
          <p>Size: {selectedImage.file_size} bytes</p>
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
