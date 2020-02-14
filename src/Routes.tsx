import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  PageHome,
  PageForbidden403,
  PageNotFound404,
  PageServiceUnavailable503
} from "xml-builder-react";

import { PageDocuments } from "./PresentationalComponents/PageDocuments";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route
        path="/home"
        render={() => <PageHome welcomeMessage="Bienvenido a XML Builder" />}
      />

      <Route path="/documents" component={PageDocuments} />

      <Route path="/error403" component={PageForbidden403} />
      <Route path="/error404" component={PageNotFound404} />
      <Route path="/error503" component={PageServiceUnavailable503} />
      <Route path="/" render={() => <Redirect to={"/home"} />} />
    </Switch>
  );
};
