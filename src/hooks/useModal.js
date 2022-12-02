import { useState } from 'react';

export const useModal = () => {
  const [isOpenModal, setIsShowing] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const hideModal = () => {
    if ( modalContent ) {
      setModalContent(null);
    }

    setIsShowing(false);
  };

  const showModal = content => {
    if ( content ) {
      setModalContent(content);
    }

    setIsShowing(true);
  };

  return {
    isOpenModal,
    modalContent,
    hideModal,
    showModal
  }
};
