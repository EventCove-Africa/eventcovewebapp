import { useState, useCallback } from "react";

const useOpenCloseModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenClose = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return {
    isOpenModal,
    handleOpenClose,
  };
};

export default useOpenCloseModal;

export const useOpenCloseModals = () => {
  const [openModals, setOpenModals] = useState<{ [key: string]: boolean }>({});

  const handleOpenClose = useCallback((modalId?: string) => {
    const id = modalId || "defaultModal"; // Use "defaultModal" as the fallback ID
    setOpenModals((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }, []);

  const isOpenModal = (modalId?: string) => {
    const id = modalId || "defaultModal"; // Default to "defaultModal"
    return openModals[id] || false;
  };

  return {
    isOpenModal,
    handleOpenClose,
  };
};
