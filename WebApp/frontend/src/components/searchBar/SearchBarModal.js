import React, { useRef, useEffect, useState } from 'react';

const SearchBarModal = ({ isOpen, hasCloseBtn = true, onClose, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <div className="">
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal w-3/5 absolute bottom-3/4">
      
      
      {children}
    </dialog>
    </div>
  );
};

export default SearchBarModal;
