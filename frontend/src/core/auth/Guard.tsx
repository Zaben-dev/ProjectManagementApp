import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';

import { UserRole } from 'core/api';

import AuthProvider, { useAuthProvider } from './AuthProvider';

namespace Guard {
  export namespace Route {
    export interface Props extends Omit<RouteProps, 'render'> {
      component: ComponentType;
      redirect: string;
    }
  }

  export namespace Children {
    export interface InjectedState extends Omit<AuthProvider.State, 'authorized' | 'pending'> {}

    export type RenderProp = (state: InjectedState) => JSX.Element;
  }

  export interface Props {
    children: JSX.Element | Children.RenderProp;
  }
}

const Admin = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = useAuthProvider();

  return pending
    ? null
    : authorized
    ? state.user.roles.includes(UserRole.Admin)
      ? typeof children === 'function'
        ? children(state)
        : children
      : null
    : null;
};

const AdminRoute = ({ component: Component, redirect, ...rest }: Guard.Route.Props) => {
  const { pending, authorized, user } = useAuthProvider();

  return (
    <Route
      {...rest}
      render={(props) =>
        pending ? null : authorized ? (
          user.roles.includes(UserRole.Admin) ? (
            <Component {...(props as any)} />
          ) : (
            <Redirect to={redirect} />
          )
        ) : (
          <Redirect to={redirect} />
        )
      }
    />
  );
};

const Protected = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = useAuthProvider();

  return pending
    ? null
    : authorized
    ? typeof children === 'function'
      ? children(state)
      : children
    : null;
};

const Unprotected = ({ children }: Guard.Props) => {
  const { pending, authorized, ...state } = useAuthProvider();

  return pending
    ? null
    : authorized
    ? null
    : typeof children === 'function'
    ? children(state)
    : children;
};

const ProtectedRoute = ({ component: Component, redirect, ...rest }: Guard.Route.Props) => {
  const { pending, authorized } = useAuthProvider();

  return (
    <Route
      {...rest}
      render={(props) =>
        pending ? null : authorized ? <Component {...(props as any)} /> : <Redirect to={redirect} />
      }
    />
  );
};

const UnprotectedRoute = ({ component: Component, redirect, ...rest }: Guard.Route.Props) => {
  const { pending, authorized } = useAuthProvider();

  return (
    <Route
      {...rest}
      render={(props) =>
        pending ? null : authorized ? <Redirect to={redirect} /> : <Component {...(props as any)} />
      }
    />
  );
};

const Guard = {
  Admin,
  AdminRoute,
  Protected,
  Unprotected,
  ProtectedRoute,
  UnprotectedRoute
};

export default Guard;
