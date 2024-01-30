import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './not-found-404.module.css';


function NotFound404() {
  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        <span className={styles.number}>4</span>
        <span className={styles.logo}></span>
        <span className={styles.number}>4</span>
      </div>

      <h2 className='text text_type_main-medium text_color_inactive'>Странно, но такой страницы нет</h2>

      <Link to='/' replace>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
        >
          Собрать бургер
        </Button>
      </Link>
    </main>
  );
}

export default NotFound404;
