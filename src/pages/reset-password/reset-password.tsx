import { useEffect, useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { passwordReset } from '../../utils/api';
import Preloader from '../../components/preloader/preloader';
import styles from './reset-password.module.css';


function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const { values, setValues, handleChange } = useForm({
    password: '',
    code: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const [codeWasEdit, setCodeWasEdit] = useState(false);

  useEffect(() => {
    resetСheck();
  }, []);

  const resetСheck = () => localStorage.removeItem('isResetFailed');

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    setIsLoading(true);

    passwordReset(values.password, values.code)
      .then((res) => {
        if (res.success) {
          navigate('/login', { replace: true });
        }
      })
      .catch((err) => {
        localStorage.setItem('isResetFailed', 'true');

        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (location.state && location.state.isRedirect) {
    return (
      <main className='centeredContainer'>
        {isLoading && (
          <Preloader />
        )}

        {!localStorage.getItem('isResetFailed') && (
          <>
            <form
              className={styles.form}
              onSubmit={onSubmit}
            >
              <h1 className='text text_type_main-medium'>Восстановление пароля</h1>

              <PasswordInput
                value={values.password}
                name='password'
                placeholder='Введите новый пароль'
                onChange={handleChange}
              />

              <Input
                value={values.code}
                type='text'
                name='code'
                placeholder='Введите код из письма'
                error={values.code.length < 6 && codeWasEdit}
                errorText='Код должен содержать минимум 6 символов'
                onChange={(evt) => {
                  setValues({ ...values, [evt.target.name]: evt.target.value });
                  !codeWasEdit && setCodeWasEdit(true);
                }}
              />

              <Button
                htmlType='submit'
                type='primary'
                size='medium'
                disabled={values.password.length < 6 || values.code.length < 6 ? true : false}
              >
                Сохранить
              </Button>
            </form>

            <div className={styles.text}>
              <p className='text text_type_main-default text_color_inactive'>
                Вспомнили пароль? <Link className={styles.link} to='/login' replace>Войти</Link>
              </p>
            </div>
          </>
        )}

        {localStorage.getItem('isResetFailed') && (
          <>
            <h2 className='text text_type_main-large text_color_inactive'>
              Ошибка восстановления пароля
            </h2>

            <Link to='/forgot-password' replace>
              <Button
                htmlType='button'
                type='primary'
                size='medium'
                onClick={resetСheck}
              >
                Попробовать снова
              </Button>
            </Link>

            <div className={styles.text}>
              <p className='text text_type_main-default text_color_inactive'>
                Вспомнили пароль? <Link className={styles.link} to='/login' replace>Войти</Link>
              </p>
            </div>
          </>
        )}
      </main>
    );
  } else {
    return <Navigate to='/forgot-password' replace />
  }
}

export default ResetPassword;
