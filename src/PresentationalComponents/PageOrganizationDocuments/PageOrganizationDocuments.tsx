import React from "react";
import { Switch, Route } from "react-router-dom";
import { XmlBuilderRouterProps } from "../../models/routerProps";
import { PageCreateStandardDocument } from "./PageCreateStandardDocument";
import { BajaDocumentPage } from "./PageCreateVoidedDocument";

interface StateToProps {}

interface DispatchToProps {}

interface Props extends StateToProps, DispatchToProps, XmlBuilderRouterProps {}

export const PageOrganizationDocuments: React.FC<Props> = ({ match }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route
          path={`${match.path}`}
          component={PageCreateStandardDocument}
          exact={true}
        />
        <Route
          path={`${match.path}/create/standard-document`}
          component={PageCreateStandardDocument}
          exact={true}
        />
        <Route
          path={`${match.path}/create/voided-document`}
          component={BajaDocumentPage}
          exact={true}
        />
      </Switch>
    </React.Fragment>
  );
};
