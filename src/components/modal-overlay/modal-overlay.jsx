import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';


function ModalOverlay({ isModalOpen, closeModal }) {
  return (
    <div className={`${styles.overlay} ${isModalOpen && styles.open}`} onClick={closeModal}></div>
  );
}


ModalOverlay.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;
