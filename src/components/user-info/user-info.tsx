import { useEffect, useState, useRef, useCallback, type FormEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchPatchUserInfo, resetFailed } from '../../services/slices/user';
import Preloader from '../preloader/preloader';
import styles from './user-info.module.css';


function UserInfo() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.user.user);
  const userStatus = useAppSelector((store) => store.user.status);

  const { values, setValues, handleChange } = useForm({
    name: user.name,
    email: user.email,
    password: ''
  });

  const nameRef = useRef<HTMLInputElement>(null);

  const [isBtnVisible, setIsBtnVisible] = useState(false);

  const [isNameDisabled, setIsNameDisabled] = useState(true);

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (values.name && values.email && values.password) {
      dispatch(fetchPatchUserInfo(values.name, values.email, values.password));
    }
  }

  const onNameIconClick = () => {
    setIsNameDisabled(false);

    setTimeout(() => {
      if (nameRef.current) {
        nameRef.current.focus()
      }
    }, 0);
  }

  const resetInput = useCallback((name, email) => {
    setValues((prev) => ({
      ...prev,
      'name': name,
      'email': email,
      'password': ''
    }));

    setIsBtnVisible(false);
  }, [setValues]);

  const resetState = () => {
    resetInput(user.name, user.email);

    dispatch(resetFailed());
  }

  useEffect(() => {
    userStatus === 'resolved' && resetInput(user.name, user.email);
  }, [user, userStatus, resetInput]);

  return (
    <>
      {userStatus === 'loading' && (
        <Preloader />
      )}

      {userStatus === 'rejected' && (
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

      {userStatus === 'resolved' && user.name && user.email &&
        (
          <section aria-label='Информация о пользователе'>
            <form
              className={styles.form}
              onSubmit={onSubmit}
              onChange={() => setIsBtnVisible(true)}
            >

              <Input
                ref={nameRef}
                type='text'
                value={values.name}
                name='name'
                placeholder='Имя'
                icon={'EditIcon'}
                error={values.name.length < 1}
                errorText='Имя не может содержать меньше 1 символа'
                onIconClick={onNameIconClick}
                onBlur={() => setIsNameDisabled(true)}
                disabled={isNameDisabled}
                onChange={handleChange}
              />

              <EmailInput
                value={values.email}
                name='email'
                placeholder='Логин'
                isIcon={true}
                onChange={handleChange}
              />

              <PasswordInput
                value={values.password}
                name='password'
                icon='EditIcon'
                onChange={handleChange}
              />

              <div className={styles.formBtn}>
                {isBtnVisible &&
                  <>
                    <Button
                      htmlType='reset'
                      type='secondary'
                      size='medium'
                      onClick={() => resetInput(user.name, user.email)}
                    >
                      Отмена
                    </Button>

                    <Button
                      htmlType='submit'
                      type='primary'
                      size='medium'
                      disabled={values.password.length < 6 || !values.name || !values.email.includes('@') || !values.email.includes('.') ? true : false}
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
