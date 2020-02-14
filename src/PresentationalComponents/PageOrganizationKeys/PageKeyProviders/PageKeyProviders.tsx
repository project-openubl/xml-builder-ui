import React from "react";
import KeysPageTabs from "../../KeysPageTabs";
import { XmlBuilderRouterProps } from "../../../models/routerProps";
import KeyProviders from "../../../SmartComponents/KeyProviders";

interface Props extends XmlBuilderRouterProps {}

interface State {}

export class PageKeyProviders extends React.Component<Props, State> {
  render() {
    const organizationId = this.props.match.params.organizationId;

    return (
      <React.Fragment>
        <KeysPageTabs activeKey={2}>
          <KeyProviders organizationId={organizationId} />
        </KeysPageTabs>
      </React.Fragment>
    );
  }
}
