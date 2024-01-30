import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  GET_ALL_ORDERS_INFO_FAILED,
  wsConnectFeedWithoutToken
} from '../../services/actions/orders-feed';
import { disconnect } from '../../services/actions/socket';
import FeedStatus from '../../components/feed-status/feed-status';
import OrderCard from '../../components/order-card/order-card';
import Preloader from '../../components/preloader/preloader';
import styles from './feed.module.css';


function Feed() {
  const dispatch = useDispatch();

  const ingredientsArr = useSelector((store) => store.ingredientsReducer.ingredients);
  const isRequestIngredientsArr = useSelector((store) => store.ingredientsReducer.isRequest);
  const isFailedIngredientsArr = useSelector((store) => store.ingredientsReducer.isFailed);

  const orders = useSelector((store) => store.ordersFeedReducer.orders);
  const isRequestOrders = useSelector((store) => store.ordersFeedReducer.isRequest);
  const isFailedOrders = useSelector((store) => store.ordersFeedReducer.isFailed);

  const wsConnected = useSelector((store) => store.socketReducer.wsConnected);
  const wsError = useSelector((store) => store.socketReducer.wsError);

  useEffect(() => {
    !wsConnected && dispatch(wsConnectFeedWithoutToken());

    return () => {
      wsConnected && dispatch(disconnect());
    }
  }, [wsConnected, dispatch]);

  useEffect(() => {
    wsError && (
      dispatch({ type: GET_ALL_ORDERS_INFO_FAILED })
    )
  }, [wsError, dispatch]);

  return (
    <>
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
          <main className='centeredContainer'>
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
          </main>
        )
      }

      {
        (orders && orders.length > 0 && !isFailedOrders) &&
        (ingredientsArr && ingredientsArr.length > 0 && !isFailedIngredientsArr) &&
        (wsConnected) &&
        (
          <main className={`${styles.main}`}>
            <div className={styles.wrap}>
              <h1 className='text text_type_main-large'>Лента заказов</h1>

              <div className={styles.content}>
                <section className={styles.sectionOrderCard}>
                  <ul className={`${styles.orderCardList} custom-scroll`}>
                    {
                      orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                      ))
                    }
                  </ul>
                </section>

                <section className={styles.sectionFeedStatus}>
                  <FeedStatus />
                </section>
              </div>
            </div>
          </main>
        )
      }
    </>
  );
}

export default Feed;
