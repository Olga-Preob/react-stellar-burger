import { type ReactNode } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../services/types/data';
import styles from './order-list-item.module.css';


type Props = {
  children?: ReactNode;
  ingredient: Ingredient;
}


function OrderListItem({ ingredient }: Props) {
  return (
    <li className={styles.orderListItem}>
      <div className={styles.description}>
        <span className={styles.imgWrap}>
          <img
            className={`${styles.img}`}
            src={ingredient.image}
            alt={`${ingredient.name}.`}
          />
        </span>
        <p className={`${styles.title} text text_type_main-default`}>
          {ingredient.name}
        </p>
      </div>

      <div className={styles.price}>
        <p className={`${styles.priceText} text text_type_digits-default`}>
          {`${ingredient.__v} x ${ingredient.price}`}
        </p>
        <span className={styles.priceIcon}>
          <CurrencyIcon type='primary' />
        </span>
      </div>
    </li>
  );
}

export default OrderListItem;
