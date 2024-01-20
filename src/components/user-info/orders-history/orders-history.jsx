import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchGetIngredients } from '../../../services/actions/ingredients';
import {
  wsConnectFeedOnToken,
  GET_USER_ORDERS_INFO_FAILED
} from '../../../services/actions/orders-feed';
import { disconnect } from '../../../services/actions/socket';
import OrderCard from '../../order-card/order-card';
import Preloader from '../../preloader/preloader';
import styles from './orders-history.module.css';


function OrdersHistory() {
  const dispatch = useDispatch();

  const ingredientsArr = useSelector((store) => store.ingredientsReducer.ingredients);
  const isRequestIngredientsArr = useSelector((store) => store.ingredientsReducer.isRequest);
  const isFailedIngredientsArr = useSelector((store) => store.ingredientsReducer.isFailed);

  const userOrders = useSelector((store) => store.ordersFeedReducer.userOrders);
  const isRequestOrders = useSelector((store) => store.ordersFeedReducer.isRequest);
  const isFailedOrders = useSelector((store) => store.ordersFeedReducer.isFailed);

  const wsConnected = useSelector((store) => store.socketReducer.wsConnected);
  const wsError = useSelector((store) => store.socketReducer.wsError);

  useEffect(() => {
    !ingredientsArr.length && dispatch(fetchGetIngredients());
  }, [ingredientsArr, dispatch]);

  useEffect(() => {
    !wsConnected && dispatch(wsConnectFeedOnToken());

    return () => {
      wsConnected && dispatch(disconnect());
    }
  }, [wsConnected, dispatch]);

  useEffect(() => {
    wsError && (
      dispatch({ type: GET_USER_ORDERS_INFO_FAILED })
    )
  }, [wsError, dispatch]);

  userOrders?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));

  return (
    <section
      aria-label='История заказов пользователя'
      className={`${styles.section} custom-scroll`}
    >
      {
        (isRequestOrders || isRequestIngredientsArr) &&
        (!isFailedOrders && !isFailedIngredientsArr) &&
        (
          <Preloader />
        )
      }

      {
        (isFailedOrders || isFailedIngredientsArr) &&
        (!isRequestOrders && !isRequestIngredientsArr) &&
        (
          <div className='profileErrMessage'>
            <h2 className='text text_type_main-medium text_color_inactive'>
              Ошибка загрузки данных
            </h2>

            <Button
              htmlType='button'
              type='primary'
              size='medium'
              onClick={() => window.location.reload()}
            >
              Попробовать снова
            </Button>
          </div>
        )
      }

      {
        (!isFailedOrders && !isFailedIngredientsArr) &&
        (!isRequestOrders && !isRequestIngredientsArr) &&
        (isRequestOrders.length === 0) && (
          <div className='profileErrMessage'>
            <h2 className='text text_type_main-medium text_color_inactive'>
              У вас пока нет собранных бургеров
            </h2>

            <Link to='/' replace>
              <Button
                htmlType='button'
                type='primary'
                size='medium'
              >
                Собрать первый бургер
              </Button>
            </Link>
          </div>
        )
      }

      {
        (userOrders && userOrders.length > 0 && !isFailedOrders) &&
        (ingredientsArr && ingredientsArr.length > 0 && !isFailedIngredientsArr) &&
        (wsConnected) &&
        (
          <ul className={`${styles.userOrderCardList}`}>
            {
              userOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))
            }
          </ul>
        )
      }

    </section>
  );
}

export default OrdersHistory;
