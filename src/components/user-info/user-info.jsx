import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchPatchUserInfo } from '../../services/actions/user';
import styles from './user-info.module.css';


function UserInfo() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.userReducer.user);

  const [nameValue, setNameValue] = useState(user.name);
  const [emailValue, setEmailValue] = useState(user.email);
  const [passwordValue, setPasswordValue] = useState('******');
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  useEffect(() => {
    resetInput();
  }, [user]);

  const onSubmit = (evt) => {
    evt.preventDefault();

    dispatch(fetchPatchUserInfo(nameValue, emailValue, passwordValue));
  }

  const resetInput = () => {
    setNameValue(user.name);
    setEmailValue(user.email);
    setPasswordValue('******');
    setIsBtnVisible(false);
  }

  return (
    <section aria-label='Информация о пользователе'>
      <form
        className={`${styles.form}`}
        onSubmit={onSubmit}
        onChange={() => setIsBtnVisible(true)}
      >

        <EmailInput
          value={nameValue}
          name={'name'}
          placeholder={'Имя'}
          isIcon={true}
          error={false}
          onChange={(evt) => setNameValue(evt.target.value)}
        />

        <EmailInput
          value={emailValue}
          name={'email'}
          placeholder={'Логин'}
          isIcon={true}
          errorText={'Некорректно указан e-mail'}
          onChange={(evt) => setEmailValue(evt.target.value)}
        />

        <EmailInput
          value={passwordValue}
          name={'password'}
          placeholder={'Пароль'}
          isIcon={true}
          error={passwordValue.length < 6}
          errorText={'Пароль должен содержать минимум 6 символов'}
          onChange={(evt) => setPasswordValue(evt.target.value)}
        />

        <div className={`${styles.form_btn}`}>
          {isBtnVisible &&
            <>
              <Button
                htmlType={'reset'}
                type={'secondary'}
                size={'medium'}
                onClick={resetInput}
              >
                Отмена
              </Button>

              <Button
                htmlType={'submit'}
                type={'primary'}
                size={'medium'}
                disabled={passwordValue.length < 6 || !nameValue || !emailValue ? true : false}
              >
                Сохранить
              </Button>
            </>
          }
        </div>
      </form>
    </section>
  );
}

export default UserInfo;
