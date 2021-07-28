import React from "react";
import ImageGalleryItem from "./imageGalleryItem/ImageGalleryItem";
import { ImageGalleryContainer } from "./ImageGalleryStyled";

const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ImageGalleryContainer>
      {images.map((image) => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          toggleModal={toggleModal}
        />
      ))}
    </ImageGalleryContainer>
  );
};

export default ImageGallery;
