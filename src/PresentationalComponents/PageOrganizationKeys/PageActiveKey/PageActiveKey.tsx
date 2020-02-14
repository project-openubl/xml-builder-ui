import React from "react";
import KeysPageTabs from "../../KeysPageTabs";
import { XmlBuilderRouterProps } from "../../../models/routerProps";
import KeysActive from "../../../SmartComponents/KeysActive";

interface Props extends XmlBuilderRouterProps {}

interface State {}

export class PageActiveKey extends React.Component<Props, State> {
  render() {
    const organizationId = this.props.match.params.organizationId;
    return (
      <React.Fragment>
        <KeysPageTabs activeKey={0}>
          <KeysActive organizationId={organizationId} />
        </KeysPageTabs>
      </React.Fragment>
    );
  }
}
