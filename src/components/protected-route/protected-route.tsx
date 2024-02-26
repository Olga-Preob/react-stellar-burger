import { type ReactNode } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useLocation, Navigate } from 'react-router-dom';


type Props = {
  children?: ReactNode;
  onlyUnAuth?: boolean;
  component: JSX.Element;
}


function Protected({ onlyUnAuth = false, component }: Props) {
  const location = useLocation();

  const user = useAppSelector((store) => store.user.user);
  const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);

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

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: {component: JSX.Element}) => (
  <Protected onlyUnAuth={true} component={component} />
);
