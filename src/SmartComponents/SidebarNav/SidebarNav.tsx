import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, NavGroup } from "@patternfly/react-core";
import { HomeIcon } from "@patternfly/react-icons";
import { OrganizationRepresentation } from "../../models/xml-builder";

interface Props {
  ctxOrganizations: OrganizationRepresentation[];
  ctxOrganization: OrganizationRepresentation | null;
}

interface State {}

export class SidebarNav extends React.Component<Props, State> {
  render() {
    const { ctxOrganization, ctxOrganizations } = this.props;
    const organizationId = ctxOrganization
      ? ctxOrganization.id
      : ctxOrganizations.length > 0
      ? ctxOrganizations[0].id
      : "unknown";

    return (
      <Nav id="nav-primary-simple" aria-label="Nav" theme="dark">
        <NavGroup title="">
          <NavItem>
            <NavLink to="/home" activeClassName="pf-m-current">
              <HomeIcon />
              &nbsp;Home
            </NavLink>
          </NavItem>
        </NavGroup>
        <NavGroup title="Consola administración">
          <NavItem key="organizations">
            <NavLink to="/organizations/list" activeClassName="pf-m-current">
              Organizaciones
            </NavLink>
          </NavItem>
          <NavItem key="keys">
            <NavLink
              to={`/organizations/manage/${organizationId}/keys`}
              activeClassName="pf-m-current"
            >
              Certificados digitales
            </NavLink>
          </NavItem>
          <NavItem key="documents">
            <NavLink
              to={`/organizations/manage/${organizationId}/documents`}
              activeClassName="pf-m-current"
            >
              Comprobantes electrónicos
            </NavLink>
          </NavItem>
        </NavGroup>
      </Nav>
    );
  }
}
