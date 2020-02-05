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
import GenericToolbarDocument from "../../PresentationalComponents/GenericToolbarDocument";

interface StateToProps {}

interface DispatchToProps {
  requestEnrichDocument: (
    documentType: DocumentType,
    document: any
  ) => Promise<any>;
  requestCreateDocument: (
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
}

class GenericDocument extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      xml: null,
      xmlFilename: "",
      enrichedData: {}
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

  enrichDocument = () => {
    const { requestEnrichDocument, inputDocument, documentType } = this.props;

    requestEnrichDocument(documentType, inputDocument).then((response: any) => {
      this.setState({ enrichedData: response });
    });
  };

  createDocument = () => {
    const { requestCreateDocument, inputDocument, documentType } = this.props;

    requestCreateDocument(documentType, inputDocument).then((response: any) => {
      if (response) {
        const fileName = extractFilenameFromContentDispositionHeaderValue(
          response.headers
        );
        this.setState({
          xml: response.data,
          xmlFilename: fileName
        });
      }
    });
  };



  render() {
    const a = () => {
      this.refresh();
    };

    console.log("renderrrrrrrrr");

    const { children, inputDocument } = this.props;
    const { xml, xmlFilename, enrichedData } = this.state;
    return (
      <React.Fragment>
        <button type="button" onClick={a}>
          carlos3333
        </button>
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
      </React.Fragment>
    );
  }
}

export default GenericDocument;
