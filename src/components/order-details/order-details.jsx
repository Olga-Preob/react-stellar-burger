import { useSelector } from 'react-redux';
import Preloader from '../preloader/preloader';
import imageDone from '../../images/order-accpeted.svg';
import styles from './order-details.module.css';


function OrderDetails() {
  const orderData = useSelector((store) => store.orderDetailsReducer);

  return (
    <div className={`${styles.wrap} pb-15`}>
      {orderData.itemsRequest &&
        <Preloader isModal={true} />
      }

      {orderData.itemsFailed && (
        <>
          <h2 className={'text text_type_main-large pb-15'}>
            Произошла ошибка
          </h2>

          <p className={'text text_type_main-default text_color_inactive'}>
            Пожалуйста, попробуйте оформить заказ повторно
          </p>
        </>
      )}

      {!orderData.itemsFailed && !orderData.itemsRequest && orderData.success && (
        <>
          <h3 className={`${styles.header} text text_type_digits-large text-shadow pb-8`}>
            {orderData.order.number}
          </h3>

          <p className={'text text_type_main-medium'}>
            идентификатор заказа
          </p>

          <div className={`${styles.image_wrap} pt-15 pb-15`}>
            <img
                className={`${styles.image}`}
                src={imageDone}
                alt='Заказ успешно оформлен.'
              />
            <span className={`${styles.background_image}`}></span>
          </div>

          <p className={'text text_type_main-default pb-2'}>
            Ваш заказ начали готовить
          </p>

          <p className={'text text_type_main-default text_color_inactive'}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
}

export default OrderDetails;
