import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CALC_TOTAL_PRICE } from '../../services/actions/burger-constructor';
import { fetchCreateOrder } from '../../services/actions/order-details';
import ConstructorBoundary from './constructor-boundary/constructor-boundary';
import ConstructorFilling from './constructor-filling/constructor-filling';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import useModal from '../../hooks/useModal';
import styles from './burger-constructor.module.css';


function BurgerConstructor() {
  const dispatch = useDispatch();

  const burgersData = useSelector((state) => state.burgerConstructorReducer);
  const orderData = useSelector((state) => state.orderDetailsReducer);

  const orderInfoModal = useModal(false);

  useEffect(() => {
    dispatch({
      type: CALC_TOTAL_PRICE
    });
  }, [burgersData.bun, burgersData.ingredients]);

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

  const onClickHandler = () => {
    if ((burgersData.bun) && (burgersData.ingredients.length)) {
      const burgersDataId = [];
      burgersDataId.push(burgersData.bun._id);
      burgersData.ingredients.forEach((ingredient) => {
        burgersDataId.push(ingredient._id);
      });

      dispatch(fetchCreateOrder(burgersDataId, orderInfoModal.onOpen()));
    }
  }

  const onCloseHandler = () => {
    orderInfoModal.onClose();
  }

  return (
    <>
      <section className={`${styles.burgerConstructor} pt-25`} aria-label='Оформление заказа'>
        <section className={`${styles.filling} pb-10`} aria-label='Состав заказа'>
          <ul className={`${styles.mainGroup} pr-4`}>
            <li className={`${styles.item}`} ref={dropTopBunTarget}>
              {
                burgersData.bun ? (
                  burgersData.bun.type === 'bun' && <ConstructorBoundary ingredient={burgersData.bun} position='top' />
                )
                  :
                (
                  <div className={`${styles.emptyBun} ${canDropBunTop ? styles.emptyBunCanDrop : null} constructor-element constructor-element_pos_top`}>
                    <p className={`${styles.emptyBunMessage} ${canDropBunTop ? styles.emptyBunMessageCanDrop : null} text_type_main-default text_color_inactive`}>Тут могла быть ваша булка</p>
                  </div>
                )
              }
            </li>
            <li className={`${styles.item}`} ref={dropFillingItemTarget}>
              {
                burgersData.ingredients.length ? (
                  <ul className={`${styles.fillingGroup} custom-scroll pr-1`}>
                    {
                      burgersData.ingredients.map((ingredient, index) => {
                        if ((ingredient.type === 'sauce') || (ingredient.type === 'main')) {
                          console.log(ingredient);
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
                      burgersData.totalPrice === 0 ?
                        (
                          'Добавьте булку и ингредиенты'
                        ) :
                        (
                          'Добавьте ингредиенты'
                        )
                    }
                  </p>
                )
              }

            </li>
            <li className={`${styles.item}`} ref={dropBottomBunTarget}>
              {
                burgersData.bun ?
                (
                  burgersData.bun.type === 'bun' && <ConstructorBoundary ingredient={burgersData.bun} position='bottom' />
                ) :
                (
                  <div className={`${styles.emptyBun} ${canDropBunBottom ? styles.emptyBunCanDrop : null} constructor-element constructor-element_pos_bottom`}>
                    <p className={`${styles.emptyBunMessage} ${canDropBunBottom ? styles.emptyBunMessageCanDrop : null} text_type_main-default text_color_inactive`}>Тут могла быть ваша булка</p>
                  </div>
                )
              }
            </li>
          </ul>
        </section>

        <section className={`${styles.checkout} pr-4`} aria-label='Итоговая стоимость'>
          <div className={`${styles.price}`}>
            <p className={`text text_type_digits-medium`}>
              {burgersData.totalPrice}
            </p>
            <CurrencyIcon type='primary' />
          </div>
          <Button htmlType='button' type='primary' size='large' onClick={onClickHandler} disabled={!burgersData.bun || !burgersData.ingredients.length || orderData.itemsRequest ? true : false}>
            Оформить заказ
          </Button>
        </section>
      </section>

      {
        <Modal
          header=''
          isModalOpen={orderInfoModal.isModalOpen}
          closeModal={onCloseHandler}
        >
          <OrderDetails />
        </Modal>
      }
    </>
  );
}

export default BurgerConstructor;
