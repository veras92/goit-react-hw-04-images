import ImageGalleryItem from 'components/ImageGalleryItem';
import React from 'react';
import { StyledImageGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ queryHits }) => {
  const galleryItems = queryHits.map(img => (
    <ImageGalleryItem
      key={img.id}
      id={img.id}
      src={img.webformatURL}
      srcOriginal={img.largeImageURL}
      alt={img.tags}
      images={queryHits}
    />
  ));

  return (
    <>
      <StyledImageGallery className="gallery">
        {galleryItems}
      </StyledImageGallery>
    </>
  );
};

ImageGallery.propTypes = {
  queryHits: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default ImageGallery;
