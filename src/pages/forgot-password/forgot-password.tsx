import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { checkUserEmail } from '../../utils/api';
import Preloader from '../../components/preloader/preloader';
import styles from './forgot-password.module.css';


function ForgotPassword() {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    setIsLoading(true);

    checkUserEmail(values.email)
      .then((res) => {
        if (res.success) {
          navigate('/reset-password', {
            replace: true,
            state: { isRedirect: true}
          });
        }
      })
      .catch((err) => {
        setIsFailed(true);

        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className='centeredContainer'>
      {isLoading && (
        <Preloader />
      )}

      {isFailed && !isLoading && (
        <>
          <h2 className='text text_type_main-large text_color_inactive'>
            Ошибка восстановления пароля
          </h2>

          <Link to='/forgot-password' replace>
            <Button
              htmlType='button'
              type='primary'
              size='medium'
              onClick={() => setIsFailed(false)}
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

      {!isFailed && !isLoading && (
        <>
          <form
            className={styles.form}
            onSubmit={onSubmit}
          >
            <h1 className='text text_type_main-medium'>Восстановление пароля</h1>

            <EmailInput
              value={values.email}
              name='email'
              placeholder='Укажите e-mail'
              isIcon={false}
              errorText='Некорректно указан e-mail'
              onChange={handleChange}
            />

            <Button
              htmlType='submit'
              type='primary'
              size='medium'
              disabled={!values.email.includes('@') || !values.email.includes('.') ? true : false}
            >
              Восстановить
            </Button>
          </form>

          <div className={styles.text}>
            <p className='text text_type_main-default text_color_inactive'>
              Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link>
            </p>
          </div>
        </>
      )}
    </main>
  );
}

export default ForgotPassword;
