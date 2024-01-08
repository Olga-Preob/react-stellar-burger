import { useSelector } from 'react-redux';
import Preloader from '../preloader/preloader';
import imageDone from '../../images/order-accpeted.svg';
import styles from './order-details.module.css';


function OrderDetails() {
  const newOrderInfo = useSelector((store) => store.orderDetailsReducer);

  return (
    <div className={`${styles.wrap} pb-15`}>
      {newOrderInfo.itemsRequest &&
        <Preloader isModal={true} />
      }

      {newOrderInfo.itemsFailed && (
        <>
          <h2 className='text text_type_main-large pb-15'>
            Произошла ошибка
          </h2>

          <p className='text text_type_main-default text_color_inactive'>
            Пожалуйста, попробуйте оформить заказ повторно
          </p>
        </>
      )}

      {!newOrderInfo.itemsFailed && !newOrderInfo.itemsRequest && newOrderInfo.success && (
        <>
          <h3 className={`${styles.header} text text_type_digits-large text-shadow pb-8`}>
            {newOrderInfo.order.number}
          </h3>

          <p className='text text_type_main-medium'>
            идентификатор заказа
          </p>

          <div className={`${styles.image_wrap} pt-15 pb-15`}>
            <img
                className={styles.image}
                src={imageDone}
                alt='Заказ успешно оформлен.'
              />
            <span className={`${styles.background_image}`}></span>
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

export default OrderDetails;
