import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  PageHome,
  PageForbidden403,
  PageNotFound404,
  PageServiceUnavailable503
} from "xml-builder-react";
import RouterOrganizationContextLoader from "./SmartComponents/RouterOrganizationContextLoader";
import { PageOrganizationList } from "./PresentationalComponents/PageOrganizationList";
import { PageOrganizationEdit } from "./PresentationalComponents/PageOrganizationEdit";
import { PageContextOrganization } from "./PresentationalComponents/PageContextOrganization";

const XmlBuilderRoute = (params: any) => {
  const { component: Component, ...rest } = params;
  return <RouterOrganizationContextLoader {...rest} component={Component} />;
};

export const AppRoutes = () => {
  return (
    <Switch>
      <XmlBuilderRoute
        path="/home"
        render={() => (
          <PageHome welcomeMessage="Bienvenido a XML Builder Signer" />
        )}
      />

      <XmlBuilderRoute
        path="/organizations/list"
        component={PageOrganizationList}
      />
      <XmlBuilderRoute
        path="/organizations/create"
        component={PageOrganizationEdit}
      />
      <XmlBuilderRoute
        path="/organizations/manage/:organizationId"
        component={PageContextOrganization}
      />

      <Route path="/error403" component={PageForbidden403} />
      <Route path="/error404" component={PageNotFound404} />
      <Route path="/error503" component={PageServiceUnavailable503} />
      <Route path="/" render={() => <Redirect to={"/home"} />} />
    </Switch>
  );
};
