import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
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

  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const isRequest = useSelector((store) => store.userReducer.isRequest);
  const isFailed = useSelector((store) => store.userReducer.isFailed);

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

    dispatch(fetchLogin(values.email, values.password));
  }

  return (
    <main className='centeredContainer'>
      {isRequest && (
        <Preloader />
      )}

      {!isFailed && !isRequest && (
        <>
          <form
            className={styles.form}
            onSubmit={onSubmit}
          >
            <h1 className='text text_type_main-medium'>Вход</h1>

            <EmailInput
              value={values.email}
              name='email'
              placeholder='E-mail'
              isIcon={false}
              errorText='Некорректно указан e-mail'
              onChange={handleChange}
            />

            <PasswordInput
              value={values.password}
              name='password'
              errorText='Пароль должен содержать минимум 6 символов'
              onChange={handleChange}
            />

            <Button
              htmlType='submit'
              type='primary'
              size='medium'
              disabled={values.password.length < 6 || !values.email ? true : false}
            >
              Войти
            </Button>
          </form>

          <div className={styles.text}>
            <p className='text text_type_main-default text_color_inactive'>
              Вы — новый пользователь? <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              Забыли пароль? <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
            </p>
          </div>
        </>
      )}

      {isFailed && !isRequest && (
        <>
          <h2 className='text text_type_main-large text_color_inactive'>
            Ошибка входа в Личный кабинет
          </h2>

          <Button
            htmlType='button'
            type='primary'
            size='medium'
            onClick={resetState}
          >
            Попробовать снова
          </Button>

          <div className={styles.text}>
            <p className='text text_type_main-default text_color_inactive'>
              Вы — новый пользователь? <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
            </p>
            <p className='text text_type_main-default text_color_inactive'>
              Забыли пароль? <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
            </p>
          </div>
        </>
      )}
    </main>
  );
}

export default Login;
