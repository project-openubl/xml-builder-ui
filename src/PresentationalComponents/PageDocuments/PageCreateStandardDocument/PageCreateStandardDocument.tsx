import React from "react";
import { TabsDocument } from "@projectopenubl/xml-builder-react";
import { XmlBuilderRouterProps } from "../../../models/routerProps";
import DocumentCreate from "../../../SmartComponents/DocumentCreate";
import { handleDocumentTabRedirect } from "../Utils";

interface Props extends XmlBuilderRouterProps {}

interface State {}

export class PageCreateStandardDocument extends React.Component<Props, State> {
  handleOnTabSelect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    eventKey: number | string
  ): void => {
    const { history } = this.props;
    handleDocumentTabRedirect(history, eventKey);
  };

  render() {
    return (
      <React.Fragment>
        <TabsDocument activeKey={0} onTabSelect={this.handleOnTabSelect}>
          <DocumentCreate formType="standard-document" />
        </TabsDocument>
      </React.Fragment>
    );
  }
}
