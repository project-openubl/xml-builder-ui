import React from "react";
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  SplitItem,
  CardHeader
} from "@patternfly/react-core";
import { DocumentType } from "../../models/xml-builder";
import { XmlBuilderRouterProps } from "../../models/routerProps";
import { extractFilenameFromContentDispositionHeaderValue } from "../../Utilities/Utils";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-xcode";
import GenericToolbarDocument from "../../PresentationalComponents/GenericToolbarDocument";

interface StateToProps {}

interface DispatchToProps {
  requestEnrichOrganizationDocument: (
    organizationId: string,
    documentType: DocumentType,
    document: any
  ) => Promise<any>;
  requestCreateOrganizationDocument: (
    organizationId: string,
    documentType: DocumentType,
    document: any
  ) => Promise<any>;
}

interface Props extends StateToProps, DispatchToProps, XmlBuilderRouterProps {
  documentType: DocumentType;
  inputDocument: any;
}

interface State {
  xml: any;
  xmlFilename: string;
  enrichedData: any;
  activeTab: number | string;
}

class GenericOrganizationDocument extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      xml: null,
      xmlFilename: "",
      enrichedData: {},
      activeTab: 0
    };
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (
      this.props.inputDocument &&
      this.props.inputDocument !== _prevProps.inputDocument
    ) {
      this.refresh();
    }
  }

  refresh = () => {
    this.enrichDocument();
    this.createDocument();
  };

  getOrganizationId = () => {
    const { match } = this.props;
    return match.params.organizationId;
  };

  createDocument = () => {
    const { requestCreateOrganizationDocument, inputDocument, documentType } = this.props;
    const organizationId = this.getOrganizationId();

    requestCreateOrganizationDocument(organizationId, documentType, inputDocument).then(
      (response: any) => {
        if (response) {
          const fileName = extractFilenameFromContentDispositionHeaderValue(
            response.headers
          );
          this.setState({
            xml: response.data,
            xmlFilename: fileName
          });
        }
      }
    );
  };

  enrichDocument = () => {
    const { requestEnrichOrganizationDocument, inputDocument, documentType } = this.props;
    const organizationId = this.getOrganizationId();

    requestEnrichOrganizationDocument(organizationId, documentType, inputDocument).then(
      (response: any) => {
        this.setState({ enrichedData: response });
      }
    );
  };

  render() {
    const { children, inputDocument } = this.props;
    const { xml, xmlFilename, enrichedData } = this.state;
    return (
      <Grid lg={2} gutter="sm">
        <GridItem span={8}>
          <SplitItem>
            <Card>
              <CardHeader>Datos del comprobante de pago</CardHeader>
              <CardBody>{children}</CardBody>
            </Card>
          </SplitItem>
        </GridItem>
        <GridItem span={4}>
          <SplitItem>
            <GenericToolbarDocument
              inputDocument={inputDocument}
              xml={xml}
              xmlFilename={xmlFilename}
              enrichedData={enrichedData}
            />
          </SplitItem>
        </GridItem>
      </Grid>
    );
  }
}

export default GenericOrganizationDocument;
