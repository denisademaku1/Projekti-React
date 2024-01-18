import React from "react";
import User from "../img/user.jpeg";
import "../style.css";

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
                <p
                  style={{ color: "#43766c", fontWeight: "bold" }}
                  className="mt-3"
                >
                  John Doe
                </p>
              </div>
            </div>
            <div className="d-flex direction-row gap-2">
              <p
                style={{ color: "#43766c", fontWeight: "bold" }}
                className="mt-3"
              >
                <i className="fa fa-eye" /> {selectedImage.views}
              </p>
              <p
                style={{ color: "#43766c", fontWeight: "bold" }}
                className="mt-3"
              >
                <i className="fa fa-heart" /> {selectedImage.favorites}
              </p>
            </div>
          </div>
          <img
            width={"80%"}
            src={selectedImage.thumbs.original}
            alt={`Thumbnail for ${selectedImage.id}`}
          />
          <div className="color w-100 d-flex mt-3 justify-content-between">
            <div style={{ padding: "0 10%" }} className="colors">
              {selectedImage.colors.map((item) => (
                <p
                  className="color_2"
                  style={{
                    backgroundColor: item,
                  }}
                />
              ))}
            </div>
            <p
              style={{
                padding: "0 10%",
              }}
              className="paragraph_modal"
            >
              <a
                href={selectedImage.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  textDecoration: "none",
                  color: "#43766c",
                }}
              >
                Fullscreen
                <i className="fa fa-expand" />
              </a>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "0 10%",
            }}
          >
            <p className="paragraph_modal">
              Category: {selectedImage.category}
            </p>
            <p className="paragraph_modal">Purity: {selectedImage.purity}</p>
            <p className="paragraph_modal">
              Type: {selectedImage.file_type.replace("/", ".")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageModal;
