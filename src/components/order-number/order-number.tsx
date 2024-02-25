import { useAppSelector } from '../../hooks/useAppSelector';
import Preloader from '../preloader/preloader';
import imageDone from '../../images/order-accpeted.svg';
import styles from './order-number.module.css';


function OrderNumber() {
  const createdOrder = useAppSelector((store) => store.orderInteraction.createdOrder);
  const createdOrderStatus = useAppSelector((store) => store.orderInteraction.status);

  return (
    <div className={`${styles.wrap} pb-15`}>
      {createdOrderStatus === 'loading' && (
        <div className={styles.preloadingElements}>
          <Preloader isOverlay={false} />
        </div>
      )}

      {createdOrderStatus === 'rejected' && (
        <div className={styles.preloadingElements}>
          <h2 className='text text_type_main-large pb-15'>
            Произошла ошибка
          </h2>

          <p className='text text_type_main-default text_color_inactive'>
            Пожалуйста, попробуйте оформить заказ повторно
          </p>
        </div>
      )}

      {createdOrderStatus === 'resolved' && createdOrder.number && (
        <>
          <h3 className={`${styles.header} text text_type_digits-large pb-8`}>
            {createdOrder.number}
          </h3>

          <p className='text text_type_main-medium'>
            идентификатор заказа
          </p>

          <div className={`${styles.imageWrap} pt-15 pb-15`}>
            <img
                className={styles.image}
                src={imageDone}
                alt='Заказ успешно оформлен.'
              />
            <span className={`${styles.backgroundImage}`}></span>
          </div>

          <p className='text text_type_main-default pb-2'>
            Ваш заказ начали готовить
          </p>

          <p className='text text_type_main-default text_color_inactive'>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}

export default OrderNumber;
