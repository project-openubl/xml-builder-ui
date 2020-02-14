import React from "react";
import { TabsDocument } from "xml-builder-react";
import { XmlBuilderRouterProps } from "../../../models/routerProps";
import DocumentCreate from "../../../SmartComponents/DocumentCreate";

interface StateToProps {}

interface DispatchToProps {}

interface Props extends StateToProps, DispatchToProps, XmlBuilderRouterProps {}

interface State {}

export class BajaDocumentPage extends React.Component<Props, State> {
  handleOnTabSelect = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    eventKey: number | string
  ): void => {
    const { history, match } = this.props;

    const organizationId = match.params.organizationId;
    const url = `/organizations/manage/${organizationId}/documents/create`;
    if (eventKey === 0) {
      history.push(url + "/standard-document");
    } else if (eventKey === 1) {
      history.push(url + "/voided-document");
    }
  };

  render() {
    const organizationId = this.props.match.params.organizationId;

    return (
      <React.Fragment>
        <TabsDocument activeKey={1} onTabSelect={this.handleOnTabSelect}>
          <DocumentCreate
            organizationId={organizationId}
            formType="voided-document"
          />
        </TabsDocument>
      </React.Fragment>
    );
  }
}
