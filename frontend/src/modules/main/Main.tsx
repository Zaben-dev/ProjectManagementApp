import React from 'react';
import { Route, RouteChildrenProps, Redirect, Switch } from 'react-router';

import { withLazy } from 'utils';

import { TemplateCategory } from 'core/api';
import { Guard } from 'core/auth';

import NotificationsProvider from 'shared/providers/notifications';

import Navbar from './navbar';
import Sidebar from './sidebar';

import csx from './Main.scss';

const Templates = withLazy(() => import('src/modules/templates'));

const TemplateDetails = withLazy(() => import('src/modules/template-details'));

const TemplateDocumentation = withLazy(() => import('src/modules/template-documentation'));

const TemplateManagement = withLazy(() => import('src/modules/template-management'));

const Main = ({ match }: RouteChildrenProps) => {
  return (
    <div className={csx.main}>
      <Navbar basePath={match.path} />

      <Sidebar basePath={match.path} />

      <main>
        <Switch>
          <Route exact path={`${match.path}/dashboard`} render={() => <div>dashboard</div>} />

          <Route exact path={`${match.path}/projects`} render={() => <div>projects</div>} />

          <Guard.ProtectedRoute
            exact
            redirect={`${match.path}/templates`}
            path={`${match.path}/templates/management/:id?`}
            component={TemplateManagement}
          />

          <Route
            exact
            path={`${match.path}/templates`}
            render={() => <Redirect to={`${match.path}/templates/${TemplateCategory.ALL}`} />}
          />

          <Route exact path={`${match.path}/templates/:category`} component={Templates} />

          <Route exact path={`${match.path}/templates/:category/:id`} component={TemplateDetails} />

          <Route
            exact
            path={`${match.path}/templates/:category/:id/documentation`}
            component={TemplateDocumentation}
          />

          <Route path="*" render={() => <Redirect to={`${match.path}/dashboard`} />} />
        </Switch>
      </main>
    </div>
  );
};

export default (props: RouteChildrenProps) => (
  <NotificationsProvider>
    <Main {...props} />
  </NotificationsProvider>
);
