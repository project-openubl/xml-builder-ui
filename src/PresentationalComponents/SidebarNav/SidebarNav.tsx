import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, NavGroup } from "@patternfly/react-core";
import { HomeIcon } from "@patternfly/react-icons";

interface Props {}

interface State {}

export class SidebarNav extends React.Component<Props, State> {
  render() {
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
          <NavItem key="documents">
            <NavLink to={`/documents`} activeClassName="pf-m-current">
              Comprobantes electrónicos
            </NavLink>
          </NavItem>
        </NavGroup>
      </Nav>
    );
  }
}
