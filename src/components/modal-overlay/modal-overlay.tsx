import { type ReactNode } from 'react';
import styles from './modal-overlay.module.css';


type Props = {
  children?: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}


function ModalOverlay({ isVisible, onClose }: Props) {
  return (
    <div className={`${styles.overlay} ${isVisible && styles.open}`} onClick={onClose}></div>
  );
}

export default ModalOverlay;
