import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { StyledModal, StyledOverlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    const handlerCloseModal = e => {
      const isEscBtn = e.code === 'Escape';
      if (isEscBtn) {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handlerCloseModal);
    return () => {
      window.removeEventListener('keydown', handlerCloseModal);
    };
  }, [onCloseModal]);

  const handlerCloseModalOverlay = e => {
    const isBackdrop = e.target === e.currentTarget;
    if (isBackdrop) {
      onCloseModal();
    }
  };

  return createPortal(
    <StyledOverlay onClick={handlerCloseModalOverlay}>
      <StyledModal>{children}</StyledModal>
    </StyledOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
