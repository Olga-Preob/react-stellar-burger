import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import{ reactModals } from '../../utils/constants';
import PropTypes from 'prop-types';
import styles from './modal.module.css';


function Modal({ header, isModalOpen, onClose, children }) {
  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const keyDownEsc = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', keyDownEsc);

    return () => {
      document.removeEventListener('keydown', keyDownEsc);
    }
  }, [isModalOpen]);

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay
          isModalOpen={isModalOpen}
          onClose={onClose}
        />
        <div className={`${styles.wrap} ${isModalOpen && styles.open}`}>
          <section className={styles.modal}>
            <div className={`${styles.header} pt-10`}>
              <h3 className={`${styles.title} text text_type_main-large`}>
                {header}
              </h3>
              <button className={styles.button} type='button' onClick={onClose}>
                <CloseIcon type='primary' />
              </button>
            </div>
          </section>
          {children}
        </div>
      </>
    ),
    reactModals
  );
}


Modal.propTypes = {
  header: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Modal;
