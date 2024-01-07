import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { checkUserEmail } from '../../utils/api';
import Preloader from '../../components/preloader/preloader';
import styles from './forgot-password.module.css';


function ForgotPassword() {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState('');
  const [isLoadin, setIsLoading] = useState(false);

  const onSubmit = (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    checkUserEmail(emailValue)
      .then((res) => {
        if (res.success) {
          navigate('/reset-password', {
            replace: true,
            state: { isRedirect: true}
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className={`${styles.main}`}>
      {isLoadin && (
        <Preloader />
      )}

      <form
        className={`${styles.form}`}
        onSubmit={onSubmit}
      >
        <h1 className={'text text_type_main-medium'}>Восстановление пароля</h1>

        <EmailInput
          value={emailValue}
          name={'email'}
          placeholder={'Укажите e-mail'}
          isIcon={false}
          errorText={'Некорректно указан e-mail'}
          onChange={(evt) => setEmailValue(evt.target.value)}
        />

        <Button
          htmlType={'submit'}
          type={'primary'}
          size={'medium'}
          disabled={!emailValue ? true : false}
        >
          Восстановить
        </Button>
      </form>

      <div className={styles.text}>
        <p className={'text text_type_main-default text_color_inactive'}>
          Вспомнили пароль? <Link className={styles.link} to='/login'>Войти</Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;
