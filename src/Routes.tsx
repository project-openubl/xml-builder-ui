import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import {
  PageHome,
  PageForbidden403,
  PageNotFound404,
  PageServiceUnavailable503
} from "@projectopenubl/xml-builder-react";

// import { PageDocuments } from "./PresentationalComponents/PageDocuments";
import { PageSwaggerUI } from "./PresentationalComponents/PageSwaggerUI";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route
        path="/home"
        render={() => (
          <PageHome
            welcomeMessage="Bienvenido a XML Builder"
            buttonAdministrarServidor={
              <Link to="/swagger-ui" className="pf-c-button pf-m-primary">
                Administrar
              </Link>
            }
          />
        )}
      />

      {/* <Route path="/documents" component={PageDocuments} /> */}
      <Route path="/swagger-ui" component={PageSwaggerUI} />

      <Route path="/error403" component={PageForbidden403} />
      <Route path="/error404" component={PageNotFound404} />
      <Route path="/error503" component={PageServiceUnavailable503} />
      <Route path="/" render={() => <Redirect to={"/home"} />} />
    </Switch>
  );
};
