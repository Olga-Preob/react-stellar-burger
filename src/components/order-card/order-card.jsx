import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchGetOrderInfo } from '../../services/actions/order-interaction';
import { SET_CURRENT_ORDER_NUMBER } from '../../services/actions/current-values';
import { INGREDIENTS_TO_SHOW, ORDER_STATUSES } from '../../utils/constants';
import { getIngredient } from '../../utils/utils';
import IngredientsPreview from './ingredients-preview/ingredients-preview';
import PropTypes from 'prop-types';
import styles from './order-card.module.css';


function OrderCard({ order }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const ingredientsArr = useSelector((store) => store.ingredientsReducer.ingredients);

  const orderIngredientsArr = useMemo(() => (
    order.ingredients.map((id) => (getIngredient(ingredientsArr, id)))
  ), [order, ingredientsArr]);

  const bun = useMemo(() => (
    [...new Set(orderIngredientsArr.filter((ing) => ing?.type === 'bun'))]
  ), [orderIngredientsArr]);

  const filling = useMemo(() => (
    orderIngredientsArr
      .filter((ing) => ing?.type !== 'bun')
      .sort((a, b) => b?.price - a?.price)
  ), [orderIngredientsArr]);

  const totalPrice = useMemo(() => (
    bun.reduce((acc, ing) => acc + ing?.price * 2, 0) + filling.reduce((acc, ing) => acc + ing?.price, 0)
  ), [bun, filling]);

  const ingredientsPreviewArr = useMemo(() => (
    [...bun, ...new Set(filling)]
  ), [bun, filling]);

  const handleOnClick = () => {
    dispatch(fetchGetOrderInfo(order.number));

    dispatch({
      type: SET_CURRENT_ORDER_NUMBER,
      payload: {
        currentOrderNumber: order.number
      }
    });
  }

  const isCorrectOrder = bun.length === 1 && filling.length > 0 && orderIngredientsArr.length > 0 && !orderIngredientsArr.includes(undefined);

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
            {`#${order.number.toString().padStart(6, 0)}`}
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
              style={{ color: ORDER_STATUSES[order.status]['color'] }}
            >
              {
                ORDER_STATUSES[order.status]['text']
              }
            </p>
          )}
        </div>

        <div className={styles.orderCardPreview}>
          <ul className={styles.ingredientsPreviewList}>
            {
              ingredientsPreviewArr.map((ingredient, index, arr) => (
                index <= INGREDIENTS_TO_SHOW && (
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


OrderCard.propTypes = {
  order: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    owner: PropTypes.string,
    status: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    __v: PropTypes.number,
    _id: PropTypes.string.isRequired
  }).isRequired
};

export default OrderCard;
