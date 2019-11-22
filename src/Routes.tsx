import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage";
import NotFoundPage from "./Pages/NotFoundPage";

export interface IAppRoute {
  path: string;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  sidebarLabel?: string;
}

export const routes: IAppRoute[] = [
  {
    path: "/",
    component: WelcomePage,
    sidebarLabel: "Bienvenido"
  }
];

export const AppRoutes = () => {
  return (
    <Switch>
      {routes.map(({ path, component }, idx) => (
        <Route path={path} component={component} key={idx} />
      ))}
      <Route component={NotFoundPage} />
    </Switch>
  );
};
