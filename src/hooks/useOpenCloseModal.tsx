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
