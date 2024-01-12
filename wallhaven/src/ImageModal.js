import React from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={imageUrl} alt="Original" />
      </div>
    </div>
  );
};

export default ImageModal;
