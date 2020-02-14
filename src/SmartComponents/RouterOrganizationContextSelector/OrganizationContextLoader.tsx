import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { OrganizationRepresentation } from "../../models/xml-builder";
import { XmlBuilderRouterProps } from "../../models/routerProps";

interface StateToProps {
  ctxOrganization: OrganizationRepresentation | null;
  ctxOrganizations: OrganizationRepresentation[];
}

interface DispatchToProps {
  selectCtxOrganization: (organization: OrganizationRepresentation) => any;
}

interface Props extends StateToProps, DispatchToProps, XmlBuilderRouterProps {
  path: string;
  exact?: boolean;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

interface State {}

class RouterOrganizationContextSelector extends React.Component<Props, State> {
  render() {
    const {
      component: Component,
      ctxOrganization,
      ctxOrganizations,
      selectCtxOrganization,

      // Select other properties to remove from ...rest
      location,
      match,
      history,
      ...rest
    } = this.props;

    const organization = ctxOrganizations.find(
      p => p.id === this.props.match.params.organizationId
    );

    if (ctxOrganization) {
      if (organization != null && organization.id !== ctxOrganization.id) {
        selectCtxOrganization(organization);
      }
    } else {
      if (organization != null) {
        selectCtxOrganization(organization);
      }
    }

    return <Route {...rest} component={Component} />;
  }
}

export default RouterOrganizationContextSelector;
