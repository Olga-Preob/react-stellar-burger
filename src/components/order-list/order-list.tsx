import { useEffect, useMemo, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentOrderNumber } from '../../services/slices/current-values';
import { fetchGetOrderInfo } from '../../services/slices/order-interaction';
import { Ingredient } from '../../services/types/data';
import { getIngredient } from '../../utils/utils';
import { statusInfo } from '../../utils/constants';
import OrderListItem from './order-list-item/order-list-item';
import Preloader from '../preloader/preloader';
import styles from './order-list.module.css';


type Props = {
  children?: ReactNode;
  isModal?: boolean;
}


function OrderList ({ isModal = false }: Props) {
  const dispatch = useAppDispatch();

  const { number } = useParams();

  const ingredientsArr = useAppSelector((store) => store.ingredients.ingredients);
  const currentOrderNumber = useAppSelector((store) => store.currentValues.currentOrderNumber);

  const requestedOrder = useAppSelector((store) => store.orderInteraction.requestedOrder);
  const requestedOrderStatus = useAppSelector((store) => store.orderInteraction.status);

  useEffect(() => {
    number && !currentOrderNumber && (
      dispatch(setCurrentOrderNumber({
        currentOrderNumber: number
      }))
    );
  }, [currentOrderNumber, number, dispatch]);

  useEffect(() => {
    currentOrderNumber && !requestedOrder.name && requestedOrderStatus !== 'loading' && (
      dispatch(fetchGetOrderInfo(currentOrderNumber))
    );
  }, [currentOrderNumber, requestedOrder, requestedOrderStatus, dispatch]);

  const orderIngredientsArr = useMemo<Ingredient[]>(() => {
    return requestedOrder.ingredients.map((id) => {
      const ingredients = getIngredient(ingredientsArr, id);
      const emptyIngredients: Ingredient = {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0
      };
      return ingredients ? ingredients : emptyIngredients;
    });
  }, [requestedOrder, ingredientsArr]);

  const bun = useMemo<Ingredient[]>(() => (
    Array.from(new Set(
      orderIngredientsArr.filter((ing) => ing.type === 'bun')
    )).map((ing) => ({
      ...ing,
      __v: 2
    }))
  ), [orderIngredientsArr]);

  const filling = useMemo<Ingredient[]>(() => {
    const fillingArr = Array.from(new Set(
      orderIngredientsArr.filter((ing) => ing.type === 'sauce' || ing.type === 'main')
    )).map((ing) => ({
      ...ing,
      __v: requestedOrder.ingredients.reduce((acc, id) => acc + (id === ing._id ? 1 : 0), 0)
    }));

    return (
      fillingArr.sort((a, b) => b.price - a.price)
    );
  }, [orderIngredientsArr, requestedOrder]);

  const orderListArr = useMemo<Ingredient[]>(() => (
    [...bun, ...filling]
  ), [bun, filling]);

  const totalPrice = useMemo<number>(() => (
    orderListArr.reduce((acc, ing) => (acc + (ing.__v * ing.price)), 0)
  ), [orderListArr]);

  return (
    <div className={styles.wrap}>
      {requestedOrderStatus === 'loading' && (
        <div className={styles.preloadingElements}>
          <Preloader isOverlay={false} />
        </div>
      )}

      {requestedOrderStatus === 'rejected' && (
        <div className={styles.preloadingElements}>
          <h2 className='text text_type_main-large pb-15'>
            Произошла ошибка
          </h2>

          <p className='text text_type_main-default text_color_inactive'>
            Пожалуйста, попробуйте обновить страницу
          </p>
        </div>
      )}

      {requestedOrderStatus === 'resolved' && requestedOrder.name && (
        <>
          <div className={styles.header}>
            <h1 className={`${isModal ? styles.orderName : ''} text text_type_main-medium`}>
              {requestedOrder.name}
            </h1>
            <p
              className={`${isModal ? styles.orderStatus : ''} text text_type_main-default`}
              style={{ color: statusInfo[requestedOrder.status]['color'] }}
            >
              {statusInfo[requestedOrder.status]['text']}
            </p>
          </div>

          <div className={styles.orderList}>
            <p className='text text_type_main-medium'>
              Состав:
            </p>

            <div className={`${styles.listWrap} custom-scroll`}>
              <ul className={`${styles.list} ${isModal ? styles.listModal : styles.listFull}`}>
                {
                  orderListArr.map((ingredient, index) => (
                    <OrderListItem
                      key={index}
                      ingredient={ingredient}
                    />
                  ))
                }
              </ul>
            </div>
          </div>

          <div className={styles.orderDescription}>
            <p className={'text text_type_main-default text_color_inactive'}>
              <FormattedDate date={new Date(requestedOrder.createdAt)} />
            </p>

            <div className={styles.orderPrice}>
              <p className={`${styles.price} text text_type_digits-default`}>
                {totalPrice}
              </p>
              <span className={styles.priceIcon}>
                <CurrencyIcon type='primary' />
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderList;
