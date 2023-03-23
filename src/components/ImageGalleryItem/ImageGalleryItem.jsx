import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import React, { Component } from 'react';
import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImg,
} from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    srcOriginal: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  state = {
    isOpenModal: false,
    currentImg: null,
  };

  handlerCurrentImg = src => {
    this.setState({
      currentImg: src,
      isOpenModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    const { src, alt, srcOriginal } = this.props;

    return (
      <StyledImageGalleryItem>
        <StyledImageGalleryItemImg
          src={src}
          alt={alt}
          onClick={() => this.handlerCurrentImg()}
        />
        {this.state.isOpenModal && (
          <Modal onCloseModal={this.onCloseModal}>
            <img src={srcOriginal} alt={alt} width="1000" />
          </Modal>
        )}
      </StyledImageGalleryItem>
    );
  }
}
