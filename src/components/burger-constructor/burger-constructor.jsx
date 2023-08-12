import { useEffect, useContext } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerInfoContext } from '../../services/app-context';
import ConstructorBoundary from './constructor-boundary/constructor-boundary';
import ConstructorFilling from './constructor-filling/constructor-filling';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import useModal from '../../hooks/useModal';
import styles from './burger-constructor.module.css';


function BurgerConstructor() {
  const orderInfoModal = useModal(false);

  const { orderСomposition, createOrder } = useContext(BurgerInfoContext);
  const { setOrderData } = useContext(BurgerInfoContext);
  const { totalPriceState, totalPriceDispatch } = useContext(BurgerInfoContext);

  const onClickHandler = () => {
    if ((orderСomposition.bun) && (orderСomposition.ingredients.length)) {
      const orderСompositionId = [];
      orderСompositionId.push(orderСomposition.bun._id);
      orderСomposition.ingredients.forEach((ingredient) => {
        orderСompositionId.push(ingredient._id);
      });

      createOrder(orderСompositionId)
        .then((res) => {
          setOrderData(Object.assign({}, res));
          orderInfoModal.onOpen();
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }

  useEffect(() => {
    totalPriceDispatch(orderСomposition);
  }, [orderСomposition]);

  return (
    <>
      <section className={`${styles.burgerConstructor} pt-25`} aria-label='Оформление заказа'>
        <section className={`${styles.filling} pb-10`} aria-label='Состав заказа'>
          <ul className={`${styles.mainGroup} pr-4`}>
            <li className={`${styles.item}`}>
              {
                orderСomposition.bun ? (
                  orderСomposition.bun.type === 'bun' && <ConstructorBoundary ingredient={orderСomposition.bun} position='top' />
                ) : (
                  <div className={`${styles.emptyBun} constructor-element constructor-element_pos_top`}>
                    <p className={`${styles.emptyBunMessage} text_type_main-default text_color_inactive`}>Тут могла быть ваша булка</p>
                  </div>
                )
              }
            </li>
            <li className={`${styles.item}`}>
              {
                orderСomposition.ingredients.length ? (
                  <ul className={`${styles.fillingGroup} custom-scroll pr-2`}>
                    {
                      orderСomposition.ingredients.map((ingredient, index) => {
                        if ((ingredient.type === 'sauce') || (ingredient.type === 'main')) {
                          console.log(ingredient);
                          return <ConstructorFilling key={index} ingredient={ingredient} />
                        } else {
                          return null;
                        }
                      })
                    }
                  </ul>
                ) : (
                  <p className={`${styles.fillingMessage} text text_type_main-default text_color_inactive`}>
                    {totalPriceState.totalPrice === 0 ? (
                      'Добавьте булку и ингредиенты'
                    ) : (
                      'Добавьте ингредиенты'
                    )}
                  </p>
                )
              }

            </li>
            <li className={`${styles.item}`}>
              {
                orderСomposition.bun ? (
                  orderСomposition.bun.type === 'bun' && <ConstructorBoundary ingredient={orderСomposition.bun} position='bottom' />
                ) : (
                  <div className={`${styles.emptyBun} constructor-element constructor-element_pos_bottom`}>
                    <p className={`${styles.emptyBunMessage} text_type_main-default text_color_inactive`}>Тут могла быть ваша булка</p>
                  </div>
                )
              }
            </li>
          </ul>
        </section>

        <section className={`${styles.checkout} pr-4`} aria-label='Итоговая стоимость'>
          <div className={`${styles.price}`}>
            <p className={`text text_type_digits-medium`}>
              {totalPriceState.totalPrice}
            </p>
            <CurrencyIcon type='primary' />
          </div>
          <Button htmlType='button' type='primary' size='large' onClick={onClickHandler}>
            Оформить заказ
          </Button>
        </section>
      </section>

      {
        <Modal
          header=''
          isModalOpen={orderInfoModal.isModalOpen}
          closeModal={() => orderInfoModal.onClose()}
        >
          <OrderDetails />
        </Modal>
      }
    </>
  );
}

export default BurgerConstructor;
