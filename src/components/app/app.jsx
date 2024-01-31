import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { STATE_OF_MODAL_BY_TYPE } from '../../utils/constants';
import { fetchCheckUserAuth } from '../../services/actions/user';
import { fetchGetIngredients } from '../../services/actions/ingredients';
import { OPEN_MODAL } from '../../services/actions/modal';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderNumber from '../order-number/order-number';
import OrderList from '../order-list/order-list';
import OrdersHistory from '../user-info/orders-history/orders-history';
import UserInfo from '../user-info/user-info';
import Modal from '../modal/modal';

import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredient/ingredient';
import Feed from '../../pages/feed/feed';
import Order from '../../pages/order/order';
import Profile from '../../pages/profile/profile';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import styles from './app.module.css';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const typeOfModal = useSelector((store) => store.modalReducer.typeOfModal);
  const ingredientsArr = useSelector((store) => store.ingredientsReducer.ingredients);
  const isAuthChecked = useSelector((store) => store.userReducer.isAuthChecked);

  const background = location.state && location.state.background;

  useEffect(() => {
    !isAuthChecked && dispatch(fetchCheckUserAuth());
  }, [isAuthChecked, dispatch]);

  useEffect(() => {
    ingredientsArr.length === 0 && dispatch(fetchGetIngredients());
  }, [ingredientsArr, dispatch]);

  useEffect(() => {
    background?.pathname === '/' && (
      dispatch({
        type: OPEN_MODAL,
        payload: {
          ...STATE_OF_MODAL_BY_TYPE.ingredientInfo
        }
      })
    );

    (background?.pathname === '/feed' || background?.pathname === '/profile/orders') && (
      dispatch({
        type: OPEN_MODAL,
        payload: {
          ...STATE_OF_MODAL_BY_TYPE.orderInfo,
          titleContent: `#${location?.pathname?.split('/').slice(-1).toString().padStart(6, 0)}`
        }
      })
    );
  }, [background, dispatch]);

  return (
    <div className={`${styles.app} custom-scroll`}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<Home />} />
        <Route
          path='/ingredients/:id'
          element={<Ingredient />}
        />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={<Order />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
          <Route path='/profile' element={<UserInfo />} />
          <Route path='/profile/orders' element={<OrdersHistory />} />
        </Route>
        <Route path='/profile/orders/:number' element={<OnlyAuth component={<Order />} />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              typeOfModal === 'ingredientInfo' && (
                <Modal>
                  <IngredientDetails />
                </Modal>
              )
            }
          />

          <Route
            path='/feed/:number'
            element={
              typeOfModal === 'orderInfo' && (
                <Modal>
                  <OrderList isModal={true} />
                </Modal>
              )
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              typeOfModal === 'orderInfo' && (
                <Modal>
                  <OrderList isModal={true} />
                </Modal>
              )
            }
          />
        </Routes>
      )}

      {typeOfModal === 'orderCreatedInfo' && (
        <Modal>
          <OrderNumber />
        </Modal>
      )}
    </div>
  );
}

export default App;
