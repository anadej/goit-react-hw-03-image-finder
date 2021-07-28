import React from "react";
import { ImageGalleryItemContainer } from "./ImageGalleryItemStyled";

const ImageGalleryItem = ({ image, toggleModal }) => {
  const { largeImageURL, webformatURL, tags } = image;

  return (
    <ImageGalleryItemContainer>
      <img
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={() => toggleModal(largeImageURL)}
      />
    </ImageGalleryItemContainer>
  );
};

export default ImageGalleryItem;
