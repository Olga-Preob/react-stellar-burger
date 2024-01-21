import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_CURRENT_ORDER_NUMBER } from '../../services/actions/current-values';
import { fetchGetOrderInfo } from '../../services/actions/order-interaction';
import { getIngredient } from '../../utils/utils';
import OrderList from '../../components/order-list/order-list';
import Preloader from '../../components/preloader/preloader';
import styles from './order.module.css';


function Order() {
  const dispatch = useDispatch();

  const { number } = useParams();

  const ingredientsArr = useSelector((store) => store.ingredientsReducer.ingredients);
  const requestedOrder = useSelector((store) => store.orderInteractionReducer.requestedOrder);
  const isRequest = useSelector((store) => store.orderInteractionReducer.isRequest);
  const isSuccess = useSelector((store) => store.orderInteractionReducer.isSuccess);
  const isFailed = useSelector((store) => store.orderInteractionReducer.isFailed);

  useEffect(() => {
    number && (
      dispatch(fetchGetOrderInfo(number))
    );

    dispatch({
      type: SET_CURRENT_ORDER_NUMBER,
      payload: {
        currentOrderNumber: number
      }
    });
  }, [number, dispatch]);

  const orderIngredientsArr = useMemo(() => (
    requestedOrder?.ingredients?.map((id) => (getIngredient(ingredientsArr, id)))
  ), [requestedOrder, ingredientsArr]);

  const bun = useMemo(() => (
    [...new Set(orderIngredientsArr?.filter((ing) => ing.type === 'bun'))]
  ), [orderIngredientsArr]);

  const filling = useMemo(() => (
    orderIngredientsArr
      ?.filter((ing) => ing.type !== 'bun')
      .sort((a, b) => b?.price - a?.price)
  ), [orderIngredientsArr]);

  const isCorrectOrder = bun.length === 1 && filling.length > 0 && orderIngredientsArr.length > 0 && !orderIngredientsArr.includes(undefined);

  return (
    <>
      {isRequest && !isFailed && (
        <Preloader />
      )}

      {!isCorrectOrder && requestedOrder && (
        <main className='centeredContainer'>
          <h2 className='text text_type_main-large text_color_inactive'>
            Заказ с некорректным составом
          </h2>

          <Link to='/feed' replace>
            <Button
              htmlType='button'
              type='primary'
              size='medium'
            >
              Лента заказов
            </Button>
          </Link>
        </main>
      )}

      {!isRequest && !isFailed && !requestedOrder && isSuccess && (
        <main className='centeredContainer'>
          <h2 className='text text_type_main-large text_color_inactive'>
            Заказа с таким номером у нас нет
          </h2>

          <Link to='/feed' replace>
            <Button
              htmlType='button'
              type='primary'
              size='medium'
            >
              Лента заказов
            </Button>
          </Link>
        </main>
      )}

      {!isRequest && !isSuccess && !requestedOrder && isFailed && (
        <main className='centeredContainer'>
          <h2 className='text text_type_main-large pb-15'>
            Произошла ошибка
          </h2>

          <p className='text text_type_main-default text_color_inactive'>
            Пожалуйста, попробуйте обновить страницу
          </p>
        </main>
      )}

      {!isRequest && !isFailed && requestedOrder && isCorrectOrder && (
        <main className={styles.main}>
          <p className={`${styles.title} text text_type_digits-default`}>
            <span className={styles.titleSpan}>
              {`#${requestedOrder.number.toString().padStart(6, 0)}`}
            </span>
          </p>

          <OrderList />
        </main>
      )}
    </>
  );
}

export default Order;
