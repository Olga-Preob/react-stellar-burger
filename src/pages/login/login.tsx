import { useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useForm } from '../../hooks/useForm';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchLogin, resetFailed } from '../../services/slices/user';
import Preloader from '../../components/preloader/preloader';
import styles from './login.module.css';


function Login() {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const userStatus = useAppSelector((store) => store.user.status);

  useEffect(() => {
    resetState();
  }, []);

  const resetState = () => {
    dispatch(resetFailed());
  }

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    dispatch(fetchLogin(values.email, values.password));
  }

  return (
    <main className='centeredContainer'>
      {userStatus === 'loading' && (
        <Preloader />
      )}

      {userStatus !== 'loading' && userStatus !== 'rejected' && (
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
              disabled={values.password.length < 6 || !values.email.includes('@') || !values.email.includes('.') ? true : false}
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

      {userStatus === 'rejected' && (
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
