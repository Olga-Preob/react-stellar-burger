import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorBoundary from './constructor-boundary/constructor-boundary';
import ConstructorFilling from './constructor-filling/constructor-filling';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';


function BurgerConstructor({ bunItem, fillingItems, onClick }) {
  return (
    <section className={`${styles.burgerConstructor} pt-25`} aria-label='Оформление заказа'>
      <section className={`${styles.filling} pb-10`} aria-label='Состав заказа'>
        <ul className={`${styles.mainGroup} pr-4`}>
          <li className={`${styles.item}`}>
            {
              bunItem.type === 'bun' && <ConstructorBoundary ingredient={bunItem} position='top' />
            }
          </li>
          <li className={`${styles.item}`}>
            <ul className={`${styles.fillingGroup} custom-scroll pr-2`}>
              {
                fillingItems.map((ingredient, index) => {
                  if ((ingredient.type === 'sauce') || (ingredient.type === 'main')) {
                    return <ConstructorFilling key={index} ingredient={ingredient} />
                  } else return null;
                })
              }
            </ul>
          </li>
          <li className={`${styles.item}`}>
            {
              bunItem.type === 'bun' && <ConstructorBoundary ingredient={bunItem} position='bottom' />
            }
          </li>
        </ul>
      </section>

      <section className={`${styles.checkout} pr-4`} aria-label='Итоговая стоимость'>
        <div className={`${styles.price}`}>
          <p className={`text text_type_digits-medium`}>
            540
          </p>
          <CurrencyIcon type='primary' />
        </div>
        <Button htmlType='button' type='primary' size='large' onClick={onClick}>
          Оформить заказ
        </Button>
      </section>
    </section>
  );
}


BurgerConstructor.propTypes = {
  bunItem: PropTypes.object.isRequired,
  fillingItems: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default BurgerConstructor;
