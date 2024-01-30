import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchNewUserRegistration, RESET_FAILED } from '../../services/actions/user';
import Preloader from '../../components/preloader/preloader';
import styles from './register.module.css';


function Register() {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    name: '',
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

    dispatch(fetchNewUserRegistration(values.name, values.email, values.password));
  }

  return (
    <main className='centeredContainer'>
      {isRequest && (
        <Preloader />
      )}

      {!isRequest && !isFailed && (
        <>
          <form
            className={styles.form}
            onSubmit={onSubmit}
          >
            <h1 className='text text_type_main-medium'>Регистрация</h1>

            <Input
              value={values.name}
              name='name'
              placeholder='Имя'
              type='text'
              onChange={handleChange}
            />

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
              disabled={!values.name || !values.email || values.password.length < 6 ? true : false}
            >
              Зарегистрироваться
            </Button>
          </form>

          <div className={styles.text}>
            <p className='text text_type_main-default text_color_inactive'>
              Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link>
            </p>
          </div>
        </>
      )}

      {isFailed && !isRequest && (
        <>
          <h2 className='text text_type_main-large text_color_inactive'>
            Ошибка регистрации
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
              У вас уже есть аккаунт? <Link className={styles.link} to='/login'>Войти</Link>
            </p>
          </div>
        </>
      )}
    </main>
  );
}

export default Register;
