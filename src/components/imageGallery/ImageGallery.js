import React from "react";
import ImageGalleryItem from "./imageGalleryItem/ImageGalleryItem";
import { ImageGalleryContainer } from "./ImageGalleryStyled";

const ImageGallery = ({ images, handleOpenModal }) => {
  return (
    <ImageGalleryContainer>
      {images.map((image) => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </ImageGalleryContainer>
  );
};

export default ImageGallery;
