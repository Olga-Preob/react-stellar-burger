import { useState, useCallback } from 'react';


function useModal(initState) {
  const [isModalOpen, setIsModalOpen] = useState(initState);

  const onOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, []);

  return {
    isModalOpen,
    onOpen,
    onClose,
    onToggle
  }
}

export default useModal;
