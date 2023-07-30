import {
  Button,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


function AppHeader() {
  return (
   <header className={`${styles.header}`}>
      <nav className={`${styles.nav} pt-4 pb-4`}>
        <ul className={styles.menu}>
          <li className={`${styles.item} ${styles.start}`}>
            <ul className={styles.nestedMenu}>
              <li className={styles.item}>
                <Button
                  htmlType='button'
                  type='secondary'
                  size='medium'
                  extraClass={`${styles.button} text_color_primary pl-5 pr-5`}>
                  <BurgerIcon type='primary' />
                  Конструктор
                </Button>
              </li>
              <li className={styles.item}>
                <Button
                  htmlType='button'
                  type='secondary'
                  size='medium'
                  extraClass={`${styles.button} text_color_inactive pl-5 pr-5`}>
                  <ListIcon type='secondary' />
                  Лента заказов
                </Button>
              </li>
            </ul>
          </li>
          <li className={styles.item}>
            <button className={styles.logo} type='button'>
              <Logo />
            </button>
          </li>
          <li className={`${styles.item} ${styles.end}`}>
            <Button
              htmlType='button'
              type='secondary'
              size='medium'
              extraClass={`${styles.button} text_color_inactive pl-5 pr-5`}>
              <ProfileIcon type='secondary' />
              Личный кабинет
            </Button>
          </li>
        </ul>
      </nav>
   </header>
  );
}

export default AppHeader;
