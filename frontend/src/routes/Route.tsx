import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RoutePropsInterface extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

// isPrivate / isSigned
// true / true = OK
// true / false = redirect to login
// false / true = redirect to dashboard
// false / false = OK

const Route: React.FC<RoutePropsInterface> = ({
  isPrivate = false,
  component: Component,
  ...restOfProps
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...restOfProps}
      render={({ location }) => {
        return isPrivate === Boolean(user) ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
