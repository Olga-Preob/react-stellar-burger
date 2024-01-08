import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';


function Protected({ onlyUnAuth = false, component }) {
  const location = useLocation();

  const { user, isAuthChecked } = useSelector((store) => store.userReducer);

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user.name && user.email) {
    const { from } = location.state || { from: { pathname: '/' } }

    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user.name && !user.email) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return component;
}


Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.object.isRequired
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
