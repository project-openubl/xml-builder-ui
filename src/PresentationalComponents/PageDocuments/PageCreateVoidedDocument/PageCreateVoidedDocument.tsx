import React from "react";
import { TabsDocument } from "xml-builder-react";
import { XmlBuilderRouterProps } from "../../../models/routerProps";
import DocumentCreate from "../../../SmartComponents/DocumentCreate";

interface StateToProps {}

interface DispatchToProps {}

interface Props extends StateToProps, DispatchToProps, XmlBuilderRouterProps {}

interface State {}

export class PageCreateVoidedDocument extends React.Component<Props, State> {
  handleOnTabSelect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    eventKey: number | string
  ): void => {
    const { history } = this.props;

    const url = `/documents/create`;
    if (eventKey === 0) {
      history.push(url + "/standard-document");
    } else if (eventKey === 1) {
      history.push(url + "/voided-document");
    }
  };

  render() {
    return (
      <React.Fragment>
        <TabsDocument activeKey={1} onTabSelect={this.handleOnTabSelect}>
          <DocumentCreate formType="voided-document" />
        </TabsDocument>
      </React.Fragment>
    );
  }
}
