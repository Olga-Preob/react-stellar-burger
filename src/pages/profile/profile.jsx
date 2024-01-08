import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { fetchLogout } from '../../services/actions/user';
import Preloader from '../../components/preloader/preloader';
import styles from './profile.module.css';


function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.userReducer);

  const activeNavLink =`${styles.link} text text_type_main-medium ${styles.active} pl-5 pr-5`;
  const inactiveNavLink = `${styles.link} text text_type_main-medium text_color_inactive pl-5 pr-5`;

  return (
    <main className={`${styles.main}`}>
      {user.isRequest && (
        <Preloader />
      )}

      <div className={`${styles.wrap} pl-5 pr-5`}>
        <nav className={`${styles.nav}`}>
          <ul className={`${styles.list}`}>
            <li className={`${styles.item}`}>
              <NavLink
                to='/profile'
                end={true}
                className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}
              >
                Профиль
              </NavLink>
            </li>
            <li className={`${styles.item}`}>
              <NavLink
                to='/profile/orders/'
                className={({ isActive }) => isActive ? activeNavLink : inactiveNavLink}
              >
                История заказов
              </NavLink>
            </li>
            <li className={`${styles.item}`}>
              <button
                type='button'
                className={`${styles.btn_logout} text text_type_main-medium text_color_inactive`}
                onClick={() => dispatch(fetchLogout())}
              >
                Выход
              </button>
            </li>
          </ul>

          <p className={`${styles.description} text text_type_main-default text_color_inactive`}>
            В этом разделе вы можете изменить&nbsp;свои персональные данные
          </p>
        </nav>

        <Outlet />
      </div>
    </main>
  );
}

export default Profile;
