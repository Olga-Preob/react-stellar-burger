import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchPatchUserInfo, RESET_FAILED } from '../../services/actions/user';
import Preloader from '../preloader/preloader';
import styles from './user-info.module.css';


function UserInfo() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.userReducer.user);
  const isFailedUserInfo = useSelector((store) => store.userReducer.isFailed);
  const isRequestUserInfo = useSelector((store) => store.userReducer.isRequest);

  const { values, setValues, handleChange } = useForm({
    name: user.name,
    email: user.email,
    password: ''
  });

  const [passwordWasEdit, setPasswordWasEdit] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  useEffect(() => {
    resetInput();
  }, [user]);

  const onSubmit = (evt) => {
    evt.preventDefault();

    values.password ?
      dispatch(fetchPatchUserInfo(values.name, values.email, values.password))
    :
      dispatch(fetchPatchUserInfo(values.name, values.email));
  }

  const resetInput = () => {
    setValues({
      ...values,
      name: user.name,
      email: user.email,
      password: ''
    });
    setPasswordWasEdit(false);
    setIsBtnVisible(false);
  }

  const resetState = () => {
    resetInput();

    dispatch({
      type: RESET_FAILED
    });
  }

  return (
    <>
      {isRequestUserInfo && !isFailedUserInfo && (
        <Preloader />
      )}

      {isFailedUserInfo && !isRequestUserInfo && (
        <div className='profileErrMessage'>
          <h2 className='text text_type_main-medium text_color_inactive'>
            Ошибка изменения данных
          </h2>

          <Button
            htmlType='button'
            type='primary'
            size='medium'
            onClick={resetState}
          >
            Попробовать снова
          </Button>
        </div>
      )}

      {user.name && user.email && !isFailedUserInfo &&
        (
          <section aria-label='Информация о пользователе'>
            <form
              className={styles.form}
              onSubmit={onSubmit}
              onChange={() => setIsBtnVisible(true)}
            >

              <EmailInput
                value={values.name}
                name='name'
                placeholder='Имя'
                isIcon={true}
                error={false}
                onChange={handleChange}
              />

              <EmailInput
                value={values.email}
                name='email'
                placeholder='Логин'
                isIcon={true}
                errorText='Некорректно указан e-mail'
                onChange={handleChange}
              />

              <EmailInput
                value={values.password}
                name='password'
                placeholder='Пароль'
                isIcon={true}
                error={values.password.length < 6 && passwordWasEdit}
                errorText='Пароль должен содержать минимум 6 символов'
                onChange={(evt) => {
                  setValues({ ...values, [evt.target.name]: evt.target.value });
                  !passwordWasEdit && setPasswordWasEdit(true);
                }}
              />

              <div className={styles.formBtn}>
                {isBtnVisible &&
                  <>
                    <Button
                      htmlType='reset'
                      type='secondary'
                      size='medium'
                      onClick={resetInput}
                    >
                      Отмена
                    </Button>

                    <Button
                      htmlType='submit'
                      type='primary'
                      size='medium'
                      disabled={values.password.length < 6 || !values.name || !values.email ? true : false}
                    >
                      Сохранить
                    </Button>
                  </>
                }
              </div>
            </form>
          </section>
        )
      }
    </>
  );
}

export default UserInfo;
