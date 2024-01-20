import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REACT_MODALS } from '../../utils/constants';
import { CLOSE_MODAL } from '../../services/actions/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import styles from './modal.module.css';


function Modal({ title = '', children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { number } = useParams();

  const typeOfModal = useSelector((store) => store.modalReducer.typeOfModal);
  const isVisible = useSelector((store) => store.modalReducer.isVisible);

  const handleOnClose = () => {
    dispatch({
      type: CLOSE_MODAL
    });

    typeOfModal === 'ingredientInfo' && navigate(-1, {replace: true});
    typeOfModal === 'orderInfo' && navigate(-1, {replace: true});
  }

  useEffect(() => {
    if (!isVisible) return;

    const keyDownEsc = (evt) => {
      if (evt.key === 'Escape') {
        dispatch({
          type: CLOSE_MODAL
        });

        typeOfModal === 'ingredientInfo' && navigate(-1, {replace: true});
        typeOfModal === 'orderInfo' && navigate(-1, {replace: true});
      }
    }

    document.addEventListener('keydown', keyDownEsc);

    return () => document.removeEventListener('keydown', keyDownEsc);
  }, [dispatch, navigate, isVisible, typeOfModal]);

  return createPortal(
    (
      <>
        <ModalOverlay
          isVisible={isVisible}
          onClose={handleOnClose}
        />

        <div className={`${styles.modal} ${isVisible && styles.open} pt-10 pr-10 pb-15 pl-10`}>
          <section className={styles.header}>

            {typeOfModal === 'orderInfo' && (
              <p className={`${styles.title} text text_type_digits-default`}>
                {`#${number.toString().padStart(6, 0)}`}
              </p>
            )}

            {typeOfModal !== 'orderInfo' && (
              <p className={`${styles.title} text text_type_main-large`}>
                {title}
              </p>
            )}

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
  title: PropTypes.string
}

export default Modal;
