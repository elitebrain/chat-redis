import React from 'react';
import { array, func, object, oneOfType } from "prop-types";

import { ModalContainer, ModalContent, ModalOveray } from './template.styles'

const Modal = props => {
  const { children, handleCloseModal } = props;
  return (
    <ModalContainer>
      <ModalOveray onClick={handleCloseModal} />
      <ModalContent>
        {children}
      </ModalContent>
    </ModalContainer>
  )
}

Modal.propTypes = {
  children: oneOfType([array, object])
}

export default Modal
