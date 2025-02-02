import React from 'react';
import { NavLink } from 'react-router-dom';

import { Guard } from 'shared/guards';

import { MobileNavigation as UIMobileNavigation, Logo } from 'ui';

import csx from './MobileNavigation.scss';

const MobileNavigation = (): JSX.Element => {
  return (
    <UIMobileNavigation>
      <NavLink activeClassName={csx.active} className={csx.link} to="/app">
        App
      </NavLink>

      <Guard.Unprotected>
        <NavLink activeClassName={csx.active} className={csx.link} to="/register">
          Register
        </NavLink>
        <NavLink activeClassName={csx.active} className={csx.link} to="/login">
          Log In
        </NavLink>
      </Guard.Unprotected>

      <NavLink className={csx.logo} to="/">
        <figure>
          <Logo />
        </figure>
        <span>Jupi.io</span>
      </NavLink>
    </UIMobileNavigation>
  );
};

export default MobileNavigation;
