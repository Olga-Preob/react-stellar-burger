import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import{ reactModals } from '../../utils/constants';
import PropTypes from 'prop-types';
import styles from './modal.module.css';


function Modal({ header, isModalOpen, closeModal, children }) {
  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const keyDownEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
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
          closeModal={closeModal}
        />
        <div className={`${styles.wrap} ${isModalOpen && styles.open}`}>
          <section className={styles.modal}>
            <div className={`${styles.header} pt-10`}>
              <h3 className={`${styles.title} text text_type_main-large`}>
                {header}
              </h3>
              <button className={styles.button} type='button' onClick={closeModal}>
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
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Modal;
