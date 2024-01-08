import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL } from '../../services/actions/modal';
import { CLEAR_CONSTRUCTOR } from '../../services/actions/burger-constructor';
import { CLEAR_ALL_INGREDIENTS_COUNT } from '../../services/actions/ingredients';
import { fetchCreateOrder } from '../../services/actions/order-details';
import ConstructorBoundary from './constructor-boundary/constructor-boundary';
import ConstructorFilling from './constructor-filling/constructor-filling';
import styles from './burger-constructor.module.css';


function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const burgerFilling = useSelector((store) => store.burgerConstructorReducer);
  const newOrderInfo = useSelector((store) => store.orderDetailsReducer);
  const user = useSelector((store) => store.userReducer.user);

  useEffect(() => {
    if (newOrderInfo.success) {
      clearConstructor();
    }
  }, [newOrderInfo.success]);

  const clearConstructor = () => {
    dispatch({
      type: CLEAR_CONSTRUCTOR
    });

    dispatch({
      type: CLEAR_ALL_INGREDIENTS_COUNT
    });
  }

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

  const totalPrice = useMemo(()=> {
    if (burgerFilling.bun) {
      return (burgerFilling.bun.price * 2) + burgerFilling.ingredients.reduce((previousValue, ingredient) => previousValue + ingredient.price, 0);
    } else {
      return burgerFilling.ingredients.reduce((previousValue, ingredient) => previousValue + ingredient.price, 0);
    }
  }, [burgerFilling]);

  const onClick = () => {
    if (user.name && user.email) {
      if ((burgerFilling.bun) && (burgerFilling.ingredients.length)) {
        const burgerFillingId = [];
        burgerFillingId.push(burgerFilling.bun._id);
        burgerFilling.ingredients.forEach((ingredient) => {
          burgerFillingId.push(ingredient._id);
        });

        dispatch(fetchCreateOrder(burgerFillingId));
      }

      dispatch({
        type: OPEN_MODAL,
        payload: {
          typeOfModal: 'create-order'
        }
      });
    } else {
      navigate('/login');
    }
  }

  return (
    <>
      <section className={styles.burgerConstructor} aria-label='Оформление заказа'>
        <section className={`${styles.filling} pb-10`} aria-label='Состав заказа'>
          <ul className={`${styles.mainGroup} pr-4`}>
            <li className={styles.item} ref={dropTopBunTarget}>
              {burgerFilling.bun ? (
                  burgerFilling.bun.type === 'bun' && <ConstructorBoundary ingredient={burgerFilling.bun} position='top' />
                )
                  :
                (
                  <div className={`${styles.emptyBun} ${canDropBunTop ? styles.emptyBunCanDrop : null} constructor-element constructor-element_pos_top`}>
                    <p className={`${styles.emptyBunMessage} ${canDropBunTop ? styles.emptyBunMessageCanDrop : null} text_type_main-default text_color_inactive`}>Тут могла быть ваша булка</p>
                  </div>
                )}
            </li>

            <li className={styles.item} ref={dropFillingItemTarget}>
              {burgerFilling.ingredients.length ? (
                  <ul className={`${styles.fillingGroup} custom-scroll pr-1`}>
                    {
                      burgerFilling.ingredients.map((ingredient, index) => {
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
                      totalPrice === 0 ?
                        (
                          'Добавьте булку и ингредиенты'
                        ) :
                        (
                          'Добавьте ингредиенты'
                        )
                    }
                  </p>
                )}
            </li>

            <li className={styles.item} ref={dropBottomBunTarget}>
              {burgerFilling.bun ?
                (
                  burgerFilling.bun.type === 'bun' && <ConstructorBoundary ingredient={burgerFilling.bun} position='bottom' />
                ) :
                (
                  <div className={`${styles.emptyBun} ${canDropBunBottom ? styles.emptyBunCanDrop : null} constructor-element constructor-element_pos_bottom`}>
                    <p className={`${styles.emptyBunMessage} ${canDropBunBottom ? styles.emptyBunMessageCanDrop : null} text_type_main-default text_color_inactive`}>Тут могла быть ваша булка</p>
                  </div>
                )}
            </li>
          </ul>
        </section>

        <section className={`${styles.checkout} pr-4`} aria-label='Итоговая стоимость'>
          <div className={styles.price}>
            <p className='text text_type_digits-medium'>
              {totalPrice}
            </p>
            <CurrencyIcon type='primary' />
          </div>

          <Button
            htmlType='button'
            type='primary'
            size='large'
            onClick={onClick}
            disabled={!burgerFilling.bun || !burgerFilling.ingredients.length || newOrderInfo.itemsRequest ? true : false}
          >
            {newOrderInfo.itemsRequest ? 'Загрузка...' : 'Оформить заказ'}
          </Button>
        </section>
      </section>
    </>
  );
}

export default BurgerConstructor;
