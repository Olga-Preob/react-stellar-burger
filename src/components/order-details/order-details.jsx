import styles from './order-details.module.css';
import imageDone from '../../images/done.svg';


function OrderDetails() {
  return (
    <section className={`${styles.description} pt-4 pb-30`}>
      <div className={styles.wrap}>
        <h4 className={`${styles.header} text text_type_digits-large text-shadow pb-8`}>034536</h4>
        <p className={'text text_type_main-medium'}>идентификатор заказа</p>
        <img className={`${styles.image} pt-15 pb-15`} src={imageDone} alt='Заказ успешно оформлен.'></img>
        <p className={'text text_type_main-default pb-2'}>Ваш заказ начали готовить</p>
        <p className={'text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </section>
  );
}

export default OrderDetails;
