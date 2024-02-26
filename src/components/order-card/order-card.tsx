import { useMemo, type ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchGetOrderInfo } from '../../services/slices/order-interaction';
import { setCurrentOrderNumber } from '../../services/slices/current-values';
import { Order, RequestedOrder } from '../../services/types/data';
import { ingredientsToShow, statusInfo, emptyIngredients } from '../../utils/constants';
import { getOrderIngredientsArr } from '../../utils/utils';
import IngredientsPreview from './ingredients-preview/ingredients-preview';
import styles from './order-card.module.css';


type Props = {
  children?: ReactNode;
  order: Order | RequestedOrder;
}


function OrderCard({ order }: Props) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const ingredientsArr = useAppSelector((store) => store.ingredients.ingredients);

  const orderIngredientsArr = useMemo(() => {
    return getOrderIngredientsArr(order, ingredientsArr, emptyIngredients);
  }, [order, ingredientsArr]);

  const bun = useMemo(() => (
    [...new Set(orderIngredientsArr.filter((ing) => ing.type === 'bun'))]
  ), [orderIngredientsArr]);

  const filling = useMemo(() => (
    orderIngredientsArr
      .filter((ing) => ing.type === 'sauce' || ing.type === 'main')
      .sort((a, b) => b.price - a.price)
  ), [orderIngredientsArr]);

  const totalPrice = useMemo(() => (
    bun.reduce((acc, ing) => acc + ing.price * 2, 0) + filling.reduce((acc, ing) => acc + ing.price, 0)
  ), [bun, filling]);

  const ingredientsPreviewArr = useMemo(() => (
    [...bun, ...new Set(filling)]
  ), [bun, filling]);

  const handleOnClick = () => {
    dispatch(fetchGetOrderInfo(String(order.number)));

    dispatch(setCurrentOrderNumber({
      currentOrderNumber: String(order.number)
    }));
  }

  const isCorrectOrder = bun.length === 1 && filling.length > 0 && orderIngredientsArr.length > 0 && order.name;

  return isCorrectOrder ? (
    <li
      className={`${styles.orderCard} pt-6 pr-6 pb-6 pl-6`}
      onClick={handleOnClick}
    >
      <Link
        to={`${location.pathname}/${order.number}`}
        state={{ background: location }}
        className={styles.link}
      >
        <div className={styles.orderCardNumber}>
          <p className={`${styles.numberText} text text_type_digits-default`}>
            {`#${order.number.toString().padStart(6, '0')}`}
          </p>
          <p className={'text text_type_main-default text_color_inactive'}>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>

        <div className={styles.orderCardTitle}>
          <h3 className={`${styles.titleText} text text_type_main-medium`}>
            {order.name}
          </h3>

          {location.pathname.includes('profile') && (
            <p
              className='text text_type_main-default'
              style={{ color: statusInfo[order.status]['color'] }}
            >
              {
                statusInfo[order.status]['text']
              }
            </p>
          )}
        </div>

        <div className={styles.orderCardPreview}>
          <ul className={styles.ingredientsPreviewList}>
            {
              ingredientsPreviewArr.map((ingredient, index, arr) => (
                index <= ingredientsToShow && ingredient && (
                  <IngredientsPreview
                    key={index}
                    ingredient={ingredient}
                    index={index}
                    originArrLength={arr.length}
                  />
                )
              ))
            }
          </ul>

          <div className={styles.orderCardPreviewPrice}>
            <p className={`${styles.priceText} text text_type_digits-default`}>
              {totalPrice}
            </p>
            <span className={styles.priceIcon}>
              <CurrencyIcon type='primary' />
            </span>
          </div>
        </div>
      </Link>
    </li>
  ) : null;
}

export default OrderCard;
