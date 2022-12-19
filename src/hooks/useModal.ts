import { useState } from 'react';

export const useModal = <T extends Partial<T>>(): {
  isOpenModal: boolean,
  modalContent: T | null,
  hideModal: () => void
  showModal: (content?: T) => void
} => {
  const [isOpenModal, setIsShowing] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<T | null>(null);

  const hideModal = () => {
    if ( modalContent ) {
      setModalContent(null);
    }

    setIsShowing(false);
  };

  const showModal = (content?: T) => {
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
