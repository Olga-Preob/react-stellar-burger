import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getUserOrdersInfoRejected, wsConnectFeedOnToken } from '../../../services/slices/orders-feed';
import { disconnect } from '../../../services/slices/websocket';
import OrderCard from '../../order-card/order-card';
import Preloader from '../../preloader/preloader';
import styles from './orders-history.module.css';


function OrdersHistory() {
  const dispatch = useAppDispatch();

  const isVisible = useAppSelector((store) => store.modal.isVisible);

  const ingredientsArrStatus = useAppSelector((store) => store.ingredients.status);

  const userOrders = useAppSelector((store) => store.ordersFeed.userOrders);
  const userOrdersStatus = useAppSelector((store) => store.ordersFeed.status);

  const wsConnected = useAppSelector((store) => store.ws.wsConnected);
  const wsError = useAppSelector((store) => store.ws.wsError);

  useEffect(() => {
    !wsConnected && dispatch(wsConnectFeedOnToken());

    return () => {
      wsConnected && dispatch(disconnect());
    }
  }, [wsConnected, dispatch]);

  useEffect(() => {
    wsError && dispatch(getUserOrdersInfoRejected());
  }, [wsError, dispatch]);

  return (
    <section
      aria-label='История заказов пользователя'
      className={`${styles.section} custom-scroll`}
    >
      {
        (userOrdersStatus === 'loading' || ingredientsArrStatus === 'loading') && isVisible === false && (
          <Preloader />
        )
      }

      {
        (userOrdersStatus === 'rejected' || ingredientsArrStatus === 'rejected') && (
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
        (userOrdersStatus === 'resolved' && ingredientsArrStatus === 'resolved') &&
        (userOrders.length === 0) && (
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
        (userOrdersStatus === 'resolved' && userOrders.length > 0) &&
        (ingredientsArrStatus === 'resolved') &&
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
