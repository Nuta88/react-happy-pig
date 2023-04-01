import { useState } from 'react';

export const useModal = <T extends Partial<T>>(): {
  isOpenModal: boolean;
  modalContent: T | null;
  hideModal: () => void;
  openModal: (content?: T) => void
} => {
  const [ isOpenModal, setIsShowing ] = useState<boolean>(false);
  const [ modalContent, setModalContent ] = useState<T | null>(null);

  const hideModal = (): void => {
    if (modalContent) setModalContent(null);

    setIsShowing(false);
  };

  const openModal = (content?: T): void => {
    if (content) setModalContent(content);

    setIsShowing(true);
  };

  return {
    isOpenModal,
    modalContent,
    hideModal,
    openModal
  };
};
