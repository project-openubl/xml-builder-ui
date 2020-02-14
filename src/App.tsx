import React from "react";
import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./Routes";

import "./App.css";
import "./App.scss";

import { LayoutBasicProject } from "@projectopenubl/xml-builder-react";

import DeleteMessageDialog from "./SmartComponents/DeleteDialog";
import { SidebarNav } from "./PresentationalComponents/SidebarNav";

import brandImageSrc from "./logo.png";
import navBrandImageSrc from "./logo-navbar.svg";

import "@redhat-cloud-services/frontend-components-notifications/index.css";

import "@redhat-cloud-services/frontend-components-notifications/index.css";
const frontendComponentsNotifications = require("@redhat-cloud-services/frontend-components-notifications");

const App: React.FC = () => {
  const NotificationsPortal =
    frontendComponentsNotifications.NotificationsPortal;

  return (
    <React.Fragment>
      <HashRouter>
        <LayoutBasicProject
          version={process.env.REACT_APP_VERSION || ""}
          productName="XML Builder"
          swaggerApiURL="https://app.swaggerhub.com/apis-docs/project-openubl/xml-builder"
          githubIssuesURL="https://github.com/project-openubl/xml-builder/issues"
          documentationURL="https://project-openubl.gitbook.io/xml-builder/"
          githubSourceCodeURL="https://github.com/project-openubl/xml-builder"
          sidebarNav={<SidebarNav />}
          brandImageSrc={brandImageSrc}
          navBrandImageSrc={navBrandImageSrc}
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
