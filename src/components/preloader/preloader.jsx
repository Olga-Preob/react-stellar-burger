import PropTypes from 'prop-types';
import styles from './preloader.module.css';


function Preloader({ isModal = false }) {
  return (
    <div className={isModal ? styles.modalWrap : styles.wrap}>
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
  );
}


Preloader.propTypes = {
  isModal: PropTypes.bool
}

export default Preloader;
