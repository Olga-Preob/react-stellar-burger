import { type ReactNode } from 'react';
import styles from './preloader.module.css';


type Props = {
  children?: ReactNode;
  isOverlay?: boolean;
}


function Preloader({ isOverlay = true }: Props) {
  return (
    <>
      {isOverlay && (
        <div className={styles.overlay}></div>
      )}

      <div className={styles.preloader}>
        <ul className={styles.list}>
          <li className={`${styles.item} ${styles.itemAfter}`}></li>
          <li className={`${styles.item} ${styles.itemAfter}`}></li>
          <li className={`${styles.item} ${styles.itemAfter}`}></li>
        </ul>
        <span className={styles.logo}></span>
        <ul className={styles.list}>
          <li className={`${styles.item} ${styles.itemBefore}`}></li>
          <li className={`${styles.item} ${styles.itemBefore}`}></li>
          <li className={`${styles.item} ${styles.itemBefore}`}></li>
        </ul>
      </div>
    </>
);
}

export default Preloader;
