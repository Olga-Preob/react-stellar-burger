import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredient } from '../../utils/utils';
import { ORDER_STATUSES } from '../../utils/constants';
import { SET_CURRENT_ORDER_NUMBER } from '../../services/actions/current-values';
import { fetchGetIngredients } from '../../services/actions/ingredients';
import { fetchGetOrderInfo } from '../../services/actions/order-interaction';
import OrderListItem from './order-list-item/order-list-item';
import Preloader from '../preloader/preloader';
import PropTypes from 'prop-types';
import styles from './order-list.module.css';


function OrderList ({ isModal = false }) {
  const dispatch = useDispatch();

  const { number } = useParams();

  const ingredientsArr = useSelector((store) => store.ingredientsReducer.ingredients);
  const currentOrderNumber = useSelector((store) => store.currentValuesReducer.currentOrderNumber);

  const requestedOrder = useSelector((store) => store.orderInteractionReducer.requestedOrder);
  const isRequest = useSelector((store) => store.orderInteractionReducer.isRequest);
  const isFailed = useSelector((store) => store.orderInteractionReducer.isFailed);

  const orderNumber = currentOrderNumber ? currentOrderNumber : number;

  useEffect(() => {
    ingredientsArr.length === 0 && dispatch(fetchGetIngredients());

    !requestedOrder && !isRequest && (
      dispatch(fetchGetOrderInfo(orderNumber))
    );

    !currentOrderNumber && (
      dispatch({
        type: SET_CURRENT_ORDER_NUMBER,
        payload: {
          currentOrderNumber: number
        }
      })
    );
  }, [ingredientsArr, requestedOrder, currentOrderNumber]);

  const orderIngredientsArr = useMemo(() => (
    requestedOrder?.ingredients.map((id) => getIngredient(ingredientsArr, id))
  ), [requestedOrder, ingredientsArr]);

  const bun = useMemo(() => (
    Array.from(new Set(
      orderIngredientsArr?.filter((ing) => ing.type === 'bun')
    )).map((ing) => ({
      ...ing,
      __v: 2
    }))
  ), [orderIngredientsArr]);

  const filling = useMemo(() => {
    const fillingArr = Array.from(new Set(
      orderIngredientsArr?.filter((ing) => ing.type !== 'bun')
    )).map((ing) => ({
      ...ing,
      __v: requestedOrder.ingredients.reduce((acc, id) => acc += id === ing._id ? 1 : 0, 0)
    }));

    return (
      fillingArr.sort((a, b) => {
        if (b.price > a.price) return 1;
        if (b.price === a.price) return 0;
        if (b.price < a.price) return -1;
      })
    );
  }, [orderIngredientsArr, requestedOrder]);

  const orderListArr = useMemo(() => (
    [...bun, ...filling]
  ), [bun, filling]);

  const totalPrice = useMemo(() => (
    orderListArr.reduce((acc, ing) => (acc += ing.__v * ing.price), 0)
  ), [orderListArr]);

  return (
    <div className={styles.wrap}>
      {isRequest && !isFailed && (
        <div className={styles.preloadingElements}>
          <Preloader isModal={true} />
        </div>
      )}

      {isFailed && !isRequest && (
        <div className={styles.preloadingElements}>
          <h2 className='text text_type_main-large pb-15'>
            Произошла ошибка
          </h2>

          <p className='text text_type_main-default text_color_inactive'>
            Пожалуйста, попробуйте обновить страницу
          </p>
        </div>
      )}

      {requestedOrder && !isRequest && !isFailed && ingredientsArr.length && (
        <>
          <div className={styles.header}>
            <h1 className={`${isModal ? styles.orderName : ''} text text_type_main-medium`}>
              {requestedOrder.name}
            </h1>
            <p
              className={`${isModal ? styles.orderStatus : ''} text text_type_main-default`}
              style={{ color: ORDER_STATUSES[requestedOrder.status]['color'] }}
            >
              {ORDER_STATUSES[requestedOrder.status]['text']}
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


OrderList.propTypes = {
  isModal: PropTypes.bool
}

export default OrderList;
