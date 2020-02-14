import React from "react";
import { Switch, Route } from "react-router-dom";
import { XmlBuilderRouterProps } from "../../models/routerProps";
import { PageActiveKey } from "./PageActiveKey";
import { PageListKeys } from "./PageListKeys";
import { PageKeyProviders } from "./PageKeyProviders";
import { PageProvider } from "./PageProvider";

interface Props extends XmlBuilderRouterProps {}

export const PageOrganizationKeys: React.FC<Props> = ({ match }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={match.path} component={PageActiveKey} exact={true} />
        <Route
          path={`${match.path}/list`}
          component={PageListKeys}
          exact={false}
        />
        <Route
          path={`${match.path}/providers`}
          component={PageKeyProviders}
          exact={true}
        />
        <Route
          path={`${match.path}/providers/:providerId`}
          component={PageProvider}
          exact={true}
        />
        <Route
          path={`${match.path}/providers/:providerId/:componentId`}
          component={PageProvider}
          exact={true}
        />
      </Switch>
    </React.Fragment>
  );
};
