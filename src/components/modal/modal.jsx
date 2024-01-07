import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CLOSE_MODAL } from '../../services/actions/modal';
import { REACT_MODALS } from '../../utils/constants';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

import { RESET_ORDER } from '../../services/actions/order-details';


function Modal({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isVisible, typeOfModal } = useSelector((store) => store.modalReducer);

  const handlerOnClose = () => {
    dispatch({
      type: CLOSE_MODAL
    });

    typeOfModal === 'ingredient' && navigate(-1);

    typeOfModal === 'create-order' && (
      dispatch({
        type: RESET_ORDER
      })
    );
  }

  useEffect(() => {
    if (!isVisible) return;

    const keyDownEsc = (evt) => {
      if (evt.key === 'Escape') {
        dispatch({
          type: CLOSE_MODAL
        });

        typeOfModal === 'ingredient' && navigate(-1);
      }
    }

    document.addEventListener('keydown', keyDownEsc);

    return () => document.removeEventListener('keydown', keyDownEsc);
  }, [dispatch, navigate, isVisible, typeOfModal]);

  const title = typeOfModal === 'ingredient' ? 'Детали ингредиента' : '';

  return createPortal(
    (
      <>
        <ModalOverlay
          isVisible={isVisible}
          onClose={handlerOnClose}
        />

        <div className={`${styles.modal} ${isVisible && styles.open} pt-10 pr-10 pb-15 pl-10`}>
          <section className={`${styles.header}`}>
            <p className={`${styles.title} text text_type_main-large`}>
              {title}
            </p>

            <button
              className={styles.button}
              type='button'
              onClick={handlerOnClose}
            >
              <CloseIcon type='primary' />
            </button>
          </section>

          <section className={`${styles.description}`}>
            {children}
          </section>
        </div>
      </>
    ),
    REACT_MODALS
  );
}


Modal.propTypes = {
  children: PropTypes.node
}

export default Modal;
