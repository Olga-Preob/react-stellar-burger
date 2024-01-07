import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchLogin, RESET_FAILED } from '../../services/actions/user';
import Preloader from '../../components/preloader/preloader';
import styles from './login.module.css';


function Login() {
  const dispatch = useDispatch();

  const userData = useSelector((store) => store.userReducer);

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    resetState();
  }, []);

  const resetState = () => {
    dispatch({
      type: RESET_FAILED
    });
  }

  const onSubmit = (evt) => {
    evt.preventDefault();

    dispatch(fetchLogin(emailValue, passwordValue));
  }

  return (
    <main className={`${styles.main}`}>
      {userData.isRequest && (
        <Preloader />
      )}

      {!userData.isFailed && !userData.isRequest && (
        <>
          <form
            className={`${styles.form}`}
            onSubmit={onSubmit}
          >
            <h1 className={'text text_type_main-medium'}>Вход</h1>

            <EmailInput
              value={emailValue}
              name={'email'}
              placeholder={'E-mail'}
              isIcon={false}
              errorText={'Некорректно указан e-mail'}
              onChange={(evt) => setEmailValue(evt.target.value)}
            />

            <PasswordInput
              value={passwordValue}
              name={'password'}
              errorText={'Пароль должен содержать минимум 6 символов'}
              onChange={(evt) => setPasswordValue(evt.target.value)}
            />

            <Button
              htmlType={'submit'}
              type={'primary'}
              size={'medium'}
              disabled={passwordValue.length < 6 || !emailValue ? true : false}
            >
              Войти
            </Button>
          </form>

          <div className={styles.text}>
            <p className={'text text_type_main-default text_color_inactive'}>
              Вы — новый пользователь? <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
            </p>
            <p className={'text text_type_main-default text_color_inactive'}>
              Забыли пароль? <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
            </p>
          </div>
        </>
      )}

      {userData.isFailed && !userData.isRequest && (
        <>
          <h2 className={'text text_type_main-large text_color_inactive'}>
            Ошибка входа в Личный кабинет
          </h2>

          <Button
            htmlType={'button'}
            type={'primary'}
            size={'medium'}
            onClick={resetState}
          >
            Попробовать снова
          </Button>

          <div className={styles.text}>
            <p className={'text text_type_main-default text_color_inactive'}>
              Вы — новый пользователь? <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
            </p>
            <p className={'text text_type_main-default text_color_inactive'}>
              Забыли пароль? <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
            </p>
          </div>
        </>
      )}
    </main>
  );
}

export default Login;
