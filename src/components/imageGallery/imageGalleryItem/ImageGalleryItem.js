import React from "react";
import { ImageGalleryItemContainer } from "./ImageGalleryItemStyled";

const ImageGalleryItem = ({ image, handleOpenModal }) => {
  const { largeImageURL, webformatURL, tags } = image;

  return (
    <ImageGalleryItemContainer>
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={() => handleOpenModal(largeImageURL)}
      />
    </ImageGalleryItemContainer>
  );
};

export default ImageGalleryItem;
