import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, StyledOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlerCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerCloseModalWindow);
  }

  handlerCloseModalWindow = e => {
    const isEscBtn = e.code === 'Escape';

    if (isEscBtn) {
      this.props.onCloseModal();
    }
  };

  handlerCloseModalOverlay = e => {
    const isBackdrop = e.target === e.currentTarget;

    if (isBackdrop) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <StyledOverlay onClick={this.handlerCloseModalOverlay}>
        <StyledModal>{this.props.children}</StyledModal>
      </StyledOverlay>,
      modalRoot
    );
  }
}
