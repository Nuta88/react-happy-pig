import { useState } from 'react';

export const useModal = <T extends Partial<T>>(isCached: boolean = false): {
  isOpenModal: boolean;
  modalContent: T | null;
  hideModal: (value?: T) => void;
  openModal: (content?: T) => void
} => {
  const [ isOpenModal, setIsShowing ] = useState<boolean>(false);
  const [ modalContent, setModalContent ] = useState<T | null>(null);

  const onSetCachedValue = (value?: T): void => {
    if (isCached && value) setModalContent(value);
  };

  const resetContent = (): void => {
    if (modalContent && !isCached) setModalContent(null);
  };

  const hideModal = (value?: T): void => {
    resetContent();
    onSetCachedValue(value);
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
