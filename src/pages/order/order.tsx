import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentOrderNumber } from '../../services/slices/current-values';
import { fetchGetOrderInfo } from '../../services/slices/order-interaction';
import { Ingredient } from '../../services/types/data';
import { getIngredient } from '../../utils/utils';
import OrderList from '../../components/order-list/order-list';
import Preloader from '../../components/preloader/preloader';
import styles from './order.module.css';


function Order() {
  const dispatch = useAppDispatch();

  const { number } = useParams();

  const isVisible = useAppSelector((store) => store.modal.isVisible);

  const ingredientsArr = useAppSelector((store) => store.ingredients.ingredients);

  const requestedOrder = useAppSelector((store) => store.orderInteraction.requestedOrder);
  const requestedOrderStatus = useAppSelector((store) => store.orderInteraction.status);

  useEffect(() => {
    if (number) {
      dispatch(fetchGetOrderInfo(number));

      dispatch(setCurrentOrderNumber({
        currentOrderNumber: number
      }));
    }
  }, [number, dispatch]);

  const orderIngredientsArr = useMemo<Ingredient[]>(() => {
    return requestedOrder.ingredients.map((id) => {
      const ingredients = getIngredient(ingredientsArr, id);
      const emptyIngredients: Ingredient = {
        _id: '',
        name: '',
        type: '',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: '',
        image_mobile: '',
        image_large: '',
        __v: 0
      };
      return ingredients ? ingredients : emptyIngredients;
    });
  }, [requestedOrder, ingredientsArr]);

  const bun = useMemo<Ingredient[]>(() => (
    [...new Set(orderIngredientsArr.filter((ing) => ing.type === 'bun'))]
  ), [orderIngredientsArr]);

  const filling = useMemo<Ingredient[]>(() => (
    orderIngredientsArr
      .filter((ing) => ing.type === 'sauce' || ing.type === 'main')
      .sort((a, b) => b.price - a.price)
  ), [orderIngredientsArr]);

  const isCorrectOrder = bun.length === 1 && filling.length > 0 && orderIngredientsArr.length > 0 && requestedOrder.name;

  return (
    <>
      {requestedOrderStatus === 'loading' && isVisible === false && (
        <Preloader />
      )}

      {requestedOrderStatus === 'rejected' && (
        <main className='centeredContainer'>
          <h2 className='text text_type_main-large pb-15'>
            Произошла ошибка
          </h2>

          <p className='text text_type_main-default text_color_inactive'>
            Пожалуйста, попробуйте обновить страницу
          </p>
        </main>
      )}

      {requestedOrderStatus === 'not found' && (
        <main className='centeredContainer'>
          <h2 className='text text_type_main-large text_color_inactive'>
            Заказа с таким номером у нас нет
          </h2>

          <Link to='/feed' replace>
            <Button
              htmlType='button'
              type='primary'
              size='medium'
            >
              Лента заказов
            </Button>
          </Link>
        </main>
      )}

      {requestedOrderStatus === 'resolved' && !isCorrectOrder && (
        <main className='centeredContainer'>
          <h2 className='text text_type_main-large text_color_inactive'>
            Заказ с некорректным составом
          </h2>

          <Link to='/feed' replace>
            <Button
              htmlType='button'
              type='primary'
              size='medium'
            >
              Лента заказов
            </Button>
          </Link>
        </main>
      )}

      {requestedOrderStatus === 'resolved' && isCorrectOrder && (
        <main className={styles.main}>
          <p className={`${styles.title} text text_type_digits-default`}>
            <span className={styles.titleSpan}>
              {`#${requestedOrder.number.toString().padStart(6, '0')}`}
            </span>
          </p>

          <OrderList />
        </main>
      )}
    </>
  );
}

export default Order;
