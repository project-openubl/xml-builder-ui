import React from "react";
import { Switch } from "react-router-dom";
import { XmlBuilderRouterProps } from "../../models/routerProps";
import { PageOrganizationEdit } from "../PageOrganizationEdit";
import { PageOrganizationKeys } from "../PageOrganizationKeys";
import { PageOrganizationDocuments } from "../PageOrganizationDocuments";
import RouterOrganizationContextSelector from "../../SmartComponents/RouterOrganizationContextSelector";

interface Props extends XmlBuilderRouterProps {}

interface State {}

export class PageContextOrganization extends React.Component<Props, State> {
  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <RouterOrganizationContextSelector
            path={`${match.path}/edit`}
            component={PageOrganizationEdit}
            exact={true}
          />
          <RouterOrganizationContextSelector
            path={`${match.path}/keys`}
            component={PageOrganizationKeys}
          />
          <RouterOrganizationContextSelector
            path={`${match.path}/documents`}
            component={PageOrganizationDocuments}
          />
        </Switch>
      </React.Fragment>
    );
  }
}
