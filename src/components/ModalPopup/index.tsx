import React, { useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const portalRoot: HTMLElement | null = document.getElementById("modal");

interface ModalPopupProps {
  isOpen: boolean;
  closeModal?: () => void;
  children: React.ReactNode;
  itemPosition?: string;
}

const ModalPopup: React.FC<ModalPopupProps> = ({
  children,
  isOpen,
  closeModal,
  itemPosition = 'center'
}) => {
  const [isExiting, setIsExiting] = useState(false);

  if (!portalRoot) return null;

  const handleAnimationComplete = () => {
    if (isExiting && closeModal) {
      closeModal();
      setIsExiting(false); // Reset the exit state
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && !isExiting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onAnimationComplete={handleAnimationComplete}
          className={`fixed inset-0 bg-MODAL_BACKGROUND flex items-${itemPosition} justify-center z-40 p-4`}
          style={{
            backdropFilter: "blur(2px)",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot
  );
};

export default ModalPopup;
