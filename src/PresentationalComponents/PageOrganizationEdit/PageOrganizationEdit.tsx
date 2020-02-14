import React from "react";
import ManageOrganizationModal from "../../SmartComponents/OrganizationEditModal";
import { XmlBuilderRouterProps } from "../../models/routerProps";

interface Props extends XmlBuilderRouterProps {}

interface State {}

export class PageOrganizationEdit extends React.Component<Props, State> {
  render() {
    const { match } = this.props;
    const organizationId = match.params.organizationId;
    return <ManageOrganizationModal organizationId={organizationId} />;
  }
}
