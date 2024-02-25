import { useEffect } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getAllOrdersInfoRejected, wsConnectFeedWithoutToken } from '../../services/slices/orders-feed';
import { disconnect } from '../../services/slices/websocket';
import FeedStatus from '../../components/feed-status/feed-status';
import OrderCard from '../../components/order-card/order-card';
import Preloader from '../../components/preloader/preloader';
import styles from './feed.module.css';


function Feed() {
  const dispatch = useAppDispatch();

  const isVisible = useAppSelector((store) => store.modal.isVisible);

  const ingredientsArr = useAppSelector((store) => store.ingredients.ingredients);
  const ingredientsArrStatus = useAppSelector((store) => store.ingredients.status);

  const orders = useAppSelector((store) => store.ordersFeed.orders);
  const ordersStatus = useAppSelector((store) => store.ordersFeed.status);

  const wsConnected = useAppSelector((store) => store.ws.wsConnected);
  const wsError = useAppSelector((store) => store.ws.wsError);

  useEffect(() => {
    !wsConnected && dispatch(wsConnectFeedWithoutToken());

    return () => {
      wsConnected && dispatch(disconnect());
    }
  }, [wsConnected, dispatch]);

  useEffect(() => {
    wsError && (
      dispatch(getAllOrdersInfoRejected())
    )
  }, [wsError, dispatch]);

  return (
    <>
      {
        (ordersStatus === 'loading' || ingredientsArrStatus === 'loading') && isVisible === false && (
          <Preloader />
        )
      }

      {
        (ordersStatus === 'rejected' || ingredientsArrStatus === 'rejected' || wsError) && (
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
        (ordersStatus === 'resolved' && orders) &&
        (ingredientsArrStatus === 'resolved' && ingredientsArr) &&
        (wsConnected) && (
          <main className={`${styles.main}`}>
            <div className={styles.wrap}>
              <h1 className='text text_type_main-large'>Лента заказов</h1>

              <div className={styles.content}>
                <section className={`${styles.sectionOrderCard} custom-scroll`}>
                  <ul className={styles.orderCardList}>
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
