import { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Order } from '../../services/types/data';
import styles from './feed-status.module.css';


function FeedStatus() {
  const orders = useAppSelector((store) => store.ordersFeed.orders);
  const total = useAppSelector((store) => store.ordersFeed.total);
  const totalToday = useAppSelector((store) => store.ordersFeed.totalToday);

  const doneOrders = useMemo<Order[]>(() => (
    orders.filter((order) => (
      order.status === 'done'
    )).slice(0, 50)
  ), [orders]);

  const pendingOrders = useMemo<Order[]>(() => (
    orders.filter((order) => (
      order.status === 'pending'
    )).slice(0, 50)
  ), [orders]);

  return (
    <>
      <div className={styles.orderNumbers}>
        <div className={styles.ordersListWrap}>
          <p className='text text_type_main-medium'>Готовы:</p>
          <ul className={`${styles.ordersList} ${styles.done} custom-scroll`}>
            {
              doneOrders.map((order) => (
                <li key={order._id}>
                  <p className={`text text_type_digits-default ${styles.ordersListNumber}`}>
                    {order.number.toString().padStart(6, '0')}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>

        <div className={styles.ordersListWrap}>
          <p className='text text_type_main-medium'>В работе:</p>
          <ul className={`${styles.ordersList} custom-scroll`}>
            {
              pendingOrders.map((order) => (
                <li key={order._id}>
                  <p className={`text text_type_digits-default ${styles.ordersListNumber}`}>
                    {order.number.toString().padStart(6, '0')}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      <div>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.textShadow} text ${styles.textTypeDigitsCustomMedium}`}>
          {total}
        </p>
      </div>

      <div>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.textShadow} text ${styles.textTypeDigitsCustomMedium}`}>
          {totalToday}
        </p>
      </div>
    </>
  );
}

export default FeedStatus;
