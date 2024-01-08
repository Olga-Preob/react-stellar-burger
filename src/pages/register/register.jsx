import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchNewUserRegistration } from '../../services/actions/user';
import Preloader from '../../components/preloader/preloader';
import styles from './register.module.css';


function Register() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.userReducer);

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onSubmit = (evt) => {
    evt.preventDefault();

    dispatch(fetchNewUserRegistration(nameValue, emailValue, passwordValue));
  }

  return (
    <main className={`${styles.main}`}>
      {user.isRequest && (
        <Preloader />
      )}

      <form
        className={`${styles.form}`}
        onSubmit={onSubmit}
      >
        <h1 className='text text_type_main-medium'>Регистрация</h1>

        <Input
          value={nameValue}
          name='name'
          placeholder='Имя'
          type='text'
          onChange={(evt) => setNameValue(evt.target.value)}
        />

        <EmailInput
          value={emailValue}
          name='email'
          placeholder='E-mail'
          isIcon={false}
          errorText='Некорректно указан e-mail'
          onChange={(evt) => setEmailValue(evt.target.value)}
        />

        <PasswordInput
          value={passwordValue}
          name='password'
          errorText='Пароль должен содержать минимум 6 символов'
          onChange={(evt) => setPasswordValue(evt.target.value)}
        />

        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={!nameValue || !emailValue || passwordValue.length < 6 ? true : false}
        >
          Зарегистрироваться
        </Button>
      </form>

      <div className={styles.text}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы? <Link className={styles.link} to='/login'>Войти</Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
