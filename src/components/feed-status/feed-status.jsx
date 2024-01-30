import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from './feed-status.module.css';


function FeedStatus () {
  const orders = useSelector((store) => store.ordersFeedReducer.orders);
  const total = useSelector((store) => store.ordersFeedReducer.total);
  const totalToday = useSelector((store) => store.ordersFeedReducer.totalToday);

  const doneOrders = useMemo(() => (
    orders.filter((order) => (
      order.status === 'done'
    )).slice(0, 30)
  ), [orders]);

  const pendingOrders = useMemo(() => (
    orders.filter((order) => (
      order.status === 'pending'
    )).slice(0, 30)
  ), [orders]);

  return (
    <>
      <div className={styles.orderNumbers}>
        <div className={styles.ordersListWrap}>
          <p className='text text_type_main-medium'>Готовы:</p>
          <ul className={`${styles.ordersList} ${styles.done}`}>
            {
              doneOrders.map((order) => (
                <li key={order._id}>
                  <p className='text text_type_digits-default'>
                    {order.number.toString().padStart(6, 0)}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>

        <div className={styles.ordersListWrap}>
          <p className='text text_type_main-medium'>В работе:</p>
          <ul className={`${styles.ordersList}`}>
            {
              pendingOrders.map((order) => (
                <li key={order._id}>
                  <p className='text text_type_digits-default'>
                    {order.number.toString().padStart(6, 0)}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      <div>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <p className={`${styles.textShadow} text text_type_digits-large`}>
          {total}
        </p>
      </div>

      <div>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={`${styles.textShadow} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </>
  );
}

export default FeedStatus;
