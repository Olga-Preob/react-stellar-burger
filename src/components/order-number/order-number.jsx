import { useSelector } from 'react-redux';
import Preloader from '../preloader/preloader';
import imageDone from '../../images/order-accpeted.svg';
import styles from './order-number.module.css';


function OrderNumber() {
  const createdOrder = useSelector((store) => store.orderInteractionReducer.createdOrder);
  const isRequest = useSelector((store) => store.orderInteractionReducer.isRequest);
  const isSuccess = useSelector((store) => store.orderInteractionReducer.isSuccess);
  const isFailed = useSelector((store) => store.orderInteractionReducer.isFailed);

  return (
    <div className={`${styles.wrap} pb-15`}>
      {isRequest && (
        <div className={styles.preloadingElements}>
          <Preloader isModal={true} />
        </div>
      )}

      {isFailed && (
        <div className={styles.preloadingElements}>
          <h2 className='text text_type_main-large pb-15'>
            Произошла ошибка
          </h2>

          <p className='text text_type_main-default text_color_inactive'>
            Пожалуйста, попробуйте оформить заказ повторно
          </p>
        </div>
      )}

      {!isFailed && !isRequest && isSuccess && (
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
