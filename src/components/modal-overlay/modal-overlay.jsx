import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';


function ModalOverlay({ isModalOpen, onClose }) {
  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onClickOverlay = (evt) => {
      if (evt.target.classList.contains(`${styles.overlay}`)) {
        onClose();
      }
    }

    document.addEventListener('click', onClickOverlay);

    return () => {
      document.removeEventListener('click', onClickOverlay);
    }
  }, [isModalOpen]);

  return (
    <div className={`${styles.overlay} ${isModalOpen && styles.open}`}></div>
  );
}


ModalOverlay.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
