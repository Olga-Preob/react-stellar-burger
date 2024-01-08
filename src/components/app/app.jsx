import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { fetchCheckUserAuth } from '../../services/actions/user';
import { OPEN_MODAL } from '../../services/actions/modal';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredient/ingredient';
import Feed from '../../pages/feed/feed';
import Profile from '../../pages/profile/profile';
import UserInfo from '../user-info/user-info';
import OrdersHistory from '../user-info/orders-history/orders-history';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import NotFound404 from '../../pages/not-found/not-found-404';

import styles from './app.module.css';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { typeOfModal } = useSelector((store) => store.modalReducer);
  const isAuthChecked = useSelector((store) => store.userReducer.isAuthChecked);

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchCheckUserAuth());
  }, [isAuthChecked])

  useEffect(() => {
    background && dispatch({
      type: OPEN_MODAL,
      payload: {
        typeOfModal: 'ingredient'
      }
    });
  }, [background, dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<Home />} />
        <Route
          path='/ingredients/:id'
          element={<Ingredient />}
        />
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />}>
          <Route path='/profile' element={<UserInfo />} />
          <Route path='/profile/orders/' element={<OrdersHistory />} />
        </Route>
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
              <Modal>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {typeOfModal === 'create-order' && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
