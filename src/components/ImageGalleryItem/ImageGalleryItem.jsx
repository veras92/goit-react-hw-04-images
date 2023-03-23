import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import React, { useState } from 'react';
import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImg,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ src, alt, srcOriginal }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);

  const handlerCurrentImg = src => {
    setCurrentImg(src);
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <StyledImageGalleryItem>
      <StyledImageGalleryItemImg
        src={src}
        alt={alt}
        onClick={() => handlerCurrentImg(srcOriginal)}
      />
      {isOpenModal && (
        <Modal onCloseModal={onCloseModal}>
          <img src={currentImg} alt={alt} width="1000" />
        </Modal>
      )}
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcOriginal: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
