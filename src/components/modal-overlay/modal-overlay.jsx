import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';


function ModalOverlay({ isVisible, onClose }) {
  return (
    <div className={`${styles.overlay} ${isVisible && styles.open}`} onClick={onClose}></div>
  );
}


ModalOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
