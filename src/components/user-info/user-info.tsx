import { useEffect, useState, useRef, type FormEvent } from 'react';
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

  const [isBtnVisible, setIsBtnVisible] = useState<boolean>(false);

  const [isNameDisabled, setIsNameDisabled] = useState<boolean>(true);

  useEffect(() => {
    resetInput();
  }, [user]);

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

  const resetInput = () => {
    setValues({
      ...values,
      name: user.name,
      email: user.email,
      password: ''
    });

    setIsBtnVisible(false);
  }

  const resetState = () => {
    resetInput();

    dispatch(resetFailed());
  }

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
                onChange={handleChange}
                disabled={isNameDisabled}
              />

              <EmailInput
                value={values.email}
                name='email'
                placeholder='Логин'
                isIcon={true}
                errorText='Некорректно указан e-mail'
                onChange={handleChange}
              />

              <PasswordInput
                value={values.password}
                name='password'
                errorText='Пароль должен содержать минимум 6 символов'
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
                      onClick={resetInput}
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
