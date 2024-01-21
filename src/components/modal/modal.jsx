import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REACT_MODALS } from '../../utils/constants';
import { CLOSE_MODAL } from '../../services/actions/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import styles from './modal.module.css';


function Modal({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isVisible = useSelector((store) => store.modalReducer.isVisible);
  const titleIsDigits = useSelector((store) => store.modalReducer.titleIsDigits);
  const titleContent = useSelector((store) => store.modalReducer.titleContent);
  const navigateState = useSelector((store) => store.modalReducer.navigateState);

  const extraTitleStyles = titleIsDigits ? 'text text_type_digits-default' : 'text text_type_main-large';

  const handleOnClose = () => {
    dispatch({
      type: CLOSE_MODAL
    });

    navigateState.isNavigate && navigate(navigateState.to, { replace: navigateState.replace });
  }

  useEffect(() => {
    if (!isVisible) return;

    const keyDownEsc = (evt) => {
      if (evt.key === 'Escape') {
        dispatch({
          type: CLOSE_MODAL
        });

        navigateState.isNavigate && navigate(navigateState.to, { replace: navigateState.replace });
      }
    }

    document.addEventListener('keydown', keyDownEsc);

    return () => document.removeEventListener('keydown', keyDownEsc);
  }, [isVisible, navigateState, navigate, dispatch]);

  return createPortal(
    (
      <>
        <ModalOverlay
          isVisible={isVisible}
          onClose={handleOnClose}
        />

        <div className={`${styles.modal} ${isVisible && styles.open} pt-10 pr-10 pb-15 pl-10`}>
          <section className={styles.header}>
            <p className={`${styles.title} ${extraTitleStyles}`}>
              {titleContent}
            </p>
            <button
              className={styles.button}
              type='button'
              onClick={handleOnClose}
            >
              <CloseIcon type='primary' />
            </button>
          </section>

          <section className={styles.description}>
            {children}
          </section>
        </div>
      </>
    ),
    REACT_MODALS
  );
}


Modal.propTypes = {
  children: PropTypes.node,
}

export default Modal;
