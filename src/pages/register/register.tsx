import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useForm } from '../../hooks/useForm';
import { Input, EmailInput, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchNewUserRegistration, resetFailed } from '../../services/slices/user';
import Preloader from '../../components/preloader/preloader';
import styles from './register.module.css';


function Register() {
  const dispatch = useAppDispatch();

  const { values, setValues, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const userStatus = useAppSelector((store) => store.user.status);

  const [nameWasEdit, setNameWasEdit] = useState<boolean>(false);

  useEffect(() => {
    resetState();
  }, []);

  const resetState = () => {
    dispatch(resetFailed());
  }

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    dispatch(fetchNewUserRegistration(values.name, values.email, values.password));
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
            <h1 className='text text_type_main-medium'>Регистрация</h1>

            <Input
              value={values.name}
              name='name'
              placeholder='Имя'
              type='text'
              error={values.name.length < 1 && nameWasEdit}
              errorText='Имя не может содержать меньше 1 символа'
              onChange={(evt) => {
                setValues({ ...values, [evt.target.name]: evt.target.value });
                !nameWasEdit && setNameWasEdit(true);
              }}
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
              disabled={!values.name || !values.email.includes('@') || !values.email.includes('.') || values.password.length < 6 ? true : false}
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

      {userStatus === 'rejected' && (
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
