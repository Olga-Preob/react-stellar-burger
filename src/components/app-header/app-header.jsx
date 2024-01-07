import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


function AppHeader() {
  const activeNavLink =`${styles.link} text text_type_main-default ${styles.active} pt-4 pr-5 pb-4 pl-5`;
  const inactiveNavLink = `${styles.link} text text_type_main-default text_color_inactive pt-4 pr-5 pb-4 pl-5`;

  return (
   <header className={`${styles.header}`}>
      <nav className={`${styles.nav} pt-4 pb-4`}>
        <ul className={styles.menu}>
          <li className={`${styles.item} ${styles.start}`}>
            <ul className={styles.nestedMenu}>
              <li className={styles.item}>
                <NavLink
                  to='/'
                  className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}
                >
                  <BurgerIcon type='secondary' />
                  Конструктор
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink
                  to='/feed'
                  className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}
                >
                  <ListIcon type='secondary' />
                  Лента заказов
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={styles.item}>
            <NavLink
              to='/'
              className={({ isActive }) => isActive ? `${styles.logo} ${styles.active_logo}` : `${styles.logo} ${styles.inactive_logo}`}
            >
              <Logo />
            </NavLink>
          </li>
          <li className={`${styles.item} ${styles.end}`}>
            <NavLink
              to='/profile'
              className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}
            >
              <ProfileIcon type='secondary' />
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
   </header>
  );
}

export default AppHeader;
