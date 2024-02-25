import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchCreateOrder } from '../../services/slices/order-interaction';
import ConstructorBoundary from './constructor-boundary/constructor-boundary';
import ConstructorFilling from './constructor-filling/constructor-filling';
import styles from './burger-constructor.module.css';


function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((store) => store.user.user);

  const burgerBun = useAppSelector((store) => store.burgerConstructor.bun);
  const burgerFilling = useAppSelector((store) => store.burgerConstructor.ingredients);

  const newOrderInfoStatus = useAppSelector((store) => store.orderInteraction.status);

  const [{ canDropBunTop }, dropTopBunTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      canDropBunTop: monitor.canDrop(),
    })
  });

  const [{ canDropFilling }, dropFillingItemTarget] = useDrop({
    accept: ['sauce', 'main'],
    collect: monitor => ({
      canDropFilling: monitor.canDrop(),
    })
  });

  const [{ canDropBunBottom }, dropBottomBunTarget] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      canDropBunBottom: monitor.canDrop(),
    })
  });

  const totalPrice = useMemo<number>(()=> {
    if (burgerBun) {
      return (burgerBun.price * 2) + burgerFilling.reduce((acc, ing) => acc += ing.price, 0);
    } else {
      return burgerFilling.reduce((acc, ing) => acc += ing.price, 0);
    }
  }, [burgerFilling, burgerBun]);

  const handleOnClick = () => {
    if (user.name && user.email) {
      if ((burgerBun) && (burgerFilling.length > 0)) {
        const burgerFillingId = [];
        burgerFillingId.push(burgerBun._id);
        burgerFilling.forEach((ingredient) => {
          burgerFillingId.push(ingredient._id);
        });

        dispatch(fetchCreateOrder(burgerFillingId));
      }
    } else {
      navigate('/login');
    }
  }

  const isFullFilling = (burgerBun && (burgerFilling.length > 0) && newOrderInfoStatus !== 'loading') || false;

  return (
    <>
      <section className={styles.burgerConstructor} aria-label='Оформление заказа'>
        <section className={`${styles.filling} pl-4`} aria-label='Состав заказа'>
          <ul className={`${styles.mainGroup}`}>
            <li className={styles.item} ref={dropTopBunTarget}>
              {burgerBun ?
                (
                  burgerBun.type === 'bun' && <ConstructorBoundary ingredient={burgerBun} position='top' />
                ) :
                (
                  <div className={`${styles.emptyBun} ${canDropBunTop ? styles.emptyBunCanDrop : null} constructor-element constructor-element_pos_top`}>
                    <p className={`${styles.emptyBunMessage} ${canDropBunTop ? styles.emptyBunMessageCanDrop : null} text_type_main-default text_color_inactive`}>
                      Тут могла быть ваша булка
                    </p>
                  </div>
                )
              }
            </li>

            <li className={styles.item} ref={dropFillingItemTarget}>
              {burgerFilling.length > 0 ? (
                  <ul className={`${styles.fillingGroup} custom-scroll pr-2`}>
                    {
                      burgerFilling.map((ingredient, index) => {
                        if ((ingredient.type === 'sauce') || (ingredient.type === 'main')) {
                          return <ConstructorFilling
                                    key={ingredient.key}
                                    index={index}
                                    ingredient={ingredient}
                                  />
                        } else {
                          return null;
                        }
                      })
                    }
                  </ul>
                ) : (
                  <p className={`${styles.fillingMessage} ${canDropFilling ? styles.fillingMessageCanDrop : null} text text_type_main-default`}>
                    {
                      totalPrice === 0 ? 'Добавьте булку и ингредиенты' : 'Добавьте ингредиенты'
                    }
                  </p>
                )}
            </li>

            <li className={styles.item} ref={dropBottomBunTarget}>
              {burgerBun ?
                (
                  burgerBun.type === 'bun' && <ConstructorBoundary ingredient={burgerBun} position='bottom' />
                ) :
                (
                  <div className={`${styles.emptyBun} ${canDropBunBottom ? styles.emptyBunCanDrop : null} constructor-element constructor-element_pos_bottom`}>
                    <p className={`${styles.emptyBunMessage} ${canDropBunBottom ? styles.emptyBunMessageCanDrop : null} text_type_main-default text_color_inactive`}>
                      Тут могла быть ваша булка
                    </p>
                  </div>
                )
              }
            </li>
          </ul>
        </section>

        <section className={`${styles.checkout} pl-4`} aria-label='Итоговая стоимость'>
          <div className={styles.price} style={isFullFilling ? { opacity: 1 } : { opacity: .5 }}>
            <p className='text text_type_digits-medium'>
              {totalPrice}
            </p>
            <CurrencyIcon type='primary' />
          </div>

          <Button
            htmlType='button'
            type='primary'
            size='large'
            onClick={handleOnClick}
            disabled={isFullFilling ? false : true}
          >
            {newOrderInfoStatus === 'loading' ? 'Загрузка...' : 'Оформить заказ'}
          </Button>
        </section>
      </section>
    </>
  );
}

export default BurgerConstructor;
