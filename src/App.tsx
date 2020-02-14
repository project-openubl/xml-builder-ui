import React from "react";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";

import "./App.css";
import "./App.scss";

import { LayoutBasicProject } from "xml-builder-react";

import DeleteMessageDialog from "./SmartComponents/DeleteDialog";
import SidebarNav from "./SmartComponents/SidebarNav";

import "@redhat-cloud-services/frontend-components-notifications/index.css";
const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");

const App: React.FC = () => {
  const NotificationsPortal =
    frontendComponentsNotifications.NotificationsPortal;

  return (
    <React.Fragment>
      <HashRouter>
        <LayoutBasicProject
          version="1.0.0.Final"
          productName="XML Builder Signer"
          swaggerApiURL="https://app.swaggerhub.com/apis-docs/project-openubl/xml-builder-signer"
          githubIssuesURL="https://github.com/project-openubl/xml-builder/issues"
          documentationURL="https://project-openubl.gitbook.io/xml-builder/"
          githubSourceCodeURL="https://github.com/project-openubl/xml-builder"
          sidebarNav={<SidebarNav />}
        >
          <AppRoutes />
          <DeleteMessageDialog />
          <NotificationsPortal />
        </LayoutBasicProject>
      </HashRouter>
    </React.Fragment>
  );
};

export default App;
