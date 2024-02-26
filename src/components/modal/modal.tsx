import { useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { reactModals } from '../../utils/constants';
import { closeModal } from '../../services/slices/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';


type Props = {
  children?: ReactNode;
}


function Modal({ children }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isVisible = useAppSelector((store) => store.modal.isVisible);
  const titleIsDigits = useAppSelector((store) => store.modal.titleIsDigits);
  const titleContent = useAppSelector((store) => store.modal.titleContent);
  const isNavigate = useAppSelector((store) => store.modal.navigateState.isNavigate);
  const navigateTo = useAppSelector((store) => store.modal.navigateState.to);
  const isReplace = useAppSelector((store) => store.modal.navigateState.replace);

  const extraTitleStyles = titleIsDigits ? 'text text_type_digits-default' : 'text text_type_main-large';

  const handleOnClose = useCallback(() => {
    dispatch(closeModal());

    if (isNavigate) {
      typeof(navigateTo) === 'number' && navigate(navigateTo);
      typeof(navigateTo) === 'string' && navigate(navigateTo, { replace: isReplace });
    }
  }, [isNavigate, navigateTo, isReplace, dispatch, navigate]);

  useEffect(() => {
    if (!isVisible) return;

    const keyDownEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleOnClose();
      }
    }

    document.addEventListener('keydown', keyDownEsc);

    return () => document.removeEventListener('keydown', keyDownEsc);
  }, [isVisible, handleOnClose]);

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
              {titleContent ? titleContent : ''}
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
    reactModals
  );
}

export default Modal;
