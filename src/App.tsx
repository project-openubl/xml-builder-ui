import React from "react";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";

import "./App.css";
import "./App.scss";
import BasicLayout from "./Pages/Layout/BasicLayout";
import DeleteMessageDialog from "./SmartComponents/DeleteDialog";
import XmlBuilderComponent from "./PresentationalComponents/XmlBuilderComponent";
import OrganizationContextLoader from "./SmartComponents/OrganizationContextLoader";

import "@redhat-cloud-services/frontend-components-notifications/index.css";
const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");

const App: React.FC = () => {
  const NotificationsPortal =
    frontendComponentsNotifications.NotificationsPortal;

  return (
    <React.Fragment>
      <HashRouter>
        <XmlBuilderComponent whenSignerComponent={OrganizationContextLoader}>
          <BasicLayout>
            <AppRoutes />
            <DeleteMessageDialog />
            <NotificationsPortal />
          </BasicLayout>
        </XmlBuilderComponent>
      </HashRouter>
    </React.Fragment>
  );
};

export default App;
