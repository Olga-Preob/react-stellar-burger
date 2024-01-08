import PropTypes from 'prop-types';
import styles from './preloader.module.css';


function Preloader({ isModal = false }) {
  return (
    <div className={isModal ? styles.wrap_modal : styles.wrap}>
      <ul className={styles.list}>
        <li className={`${styles.item} ${styles.item_after}`}></li>
        <li className={`${styles.item} ${styles.item_after}`}></li>
        <li className={`${styles.item} ${styles.item_after}`}></li>
      </ul>
      <span className={styles.logo}></span>
      <ul className={styles.list}>
        <li className={`${styles.item} ${styles.item_before}`}></li>
        <li className={`${styles.item} ${styles.item_before}`}></li>
        <li className={`${styles.item} ${styles.item_before}`}></li>
      </ul>
    </div>
  );
}


Preloader.propTypes = {
  isModal: PropTypes.bool
}

export default Preloader;
