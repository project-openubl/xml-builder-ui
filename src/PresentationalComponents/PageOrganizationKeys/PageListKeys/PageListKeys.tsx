import React from "react";
import KeysPageTabs from "../../KeysPageTabs";
import KeyList from "../../../SmartComponents/KeyList";
import { XmlBuilderRouterProps } from "../../../models/routerProps";

interface Props extends XmlBuilderRouterProps {}

interface State {}

export class PageListKeys extends React.Component<Props, State> {
  render() {
    const organizationId = this.props.match.params.organizationId;

    return (
      <React.Fragment>
        <KeysPageTabs activeKey={1}>
          {organizationId && <KeyList organizationId={organizationId} />}
        </KeysPageTabs>
      </React.Fragment>
    );
  }
}
