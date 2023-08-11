import { useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

  const { orderСomposition, placeAnOrder } = useContext(BurgerInfoContext);
  const { setOrderData } = useContext(BurgerInfoContext);
  const { totalPriceState, totalPriceDispatch } = useContext(BurgerInfoContext);

  const onClickHandler = () => {
    const orderСompositionId = [];
    orderСompositionId.push(orderСomposition.bun._id);
    orderСomposition.ingredients.forEach((ingredient) => {
      orderСompositionId.push(ingredient._id);
    });

    placeAnOrder(orderСompositionId)
      .then((res) => {
        setOrderData(Object.assign({}, res));
        orderInfoModal.onOpen();
      })
      .catch((err) => {
        console.error(err);
      });
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
                orderСomposition.bun && orderСomposition.bun.type === 'bun' && <ConstructorBoundary ingredient={orderСomposition.bun} position='top' />
              }
            </li>
            <li className={`${styles.item}`}>
              <ul className={`${styles.fillingGroup} custom-scroll pr-2`}>
                {
                  orderСomposition.ingredients.map((ingredient) => {
                    if ((ingredient.type === 'sauce') || (ingredient.type === 'main')) {
                      return <ConstructorFilling key={uuidv4()} ingredient={ingredient} />
                    } else return null;
                  })
                }
              </ul>
            </li>
            <li className={`${styles.item}`}>
              {
                orderСomposition.bun && orderСomposition.bun.type === 'bun' && <ConstructorBoundary ingredient={orderСomposition.bun} position='bottom' />
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
