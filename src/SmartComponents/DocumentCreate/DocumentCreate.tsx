import React from "react";
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  SplitItem,
  CardHeader
} from "@patternfly/react-core";
import {
  FormStandardDocument,
  DocumentRequestResponseViewer,
  StandardDocumentFormData,
  FormVoidedDocument,
  FormVoidedDocumentData
} from "xml-builder-react";
import { DocumentType } from "../../models/xml-builder";
import { XmlBuilderRouterProps } from "../../models/routerProps";
import { extractFilenameFromContentDispositionHeaderValue } from "../../Utilities/Utils";

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
  formType: string;
}

interface State {
  requestInput: any;
  responseEnrichedOutput: any;
  responseXMLOutput: {
    xml: any;
    filename: string;
  } | null;
}

class DocumentCreate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      requestInput: null,
      responseEnrichedOutput: null,
      responseXMLOutput: null
    };
  }

  createDocument = (documentType: DocumentType, input: any) => {
    const { requestCreateDocument } = this.props;

    requestCreateDocument(documentType, input).then((response: any) => {
      if (response) {
        const fileName = extractFilenameFromContentDispositionHeaderValue(
          response.headers
        );
        this.setState({
          responseXMLOutput: {
            xml: response.data,
            filename: fileName
          }
        });
      }
    });
  };

  enrichDocument = (documentType: DocumentType, input: any) => {
    const { requestEnrichDocument } = this.props;

    requestEnrichDocument(documentType, input).then((response: any) => {
      this.setState({ responseEnrichedOutput: response });
    });
  };

  handleFormStandardDocumentSubmit = (
    form: StandardDocumentFormData,
    input: any
  ) => {
    this.setState({ requestInput: input }, () => {
      let documentType: DocumentType = form.tipoComprobante as DocumentType;
      this.createDocument(documentType, input);
      this.enrichDocument(documentType, input);
    });
  };

  handleFormVoidedDocumentSubmit = (
    form: FormVoidedDocumentData,
    input: any
  ) => {
    this.setState({ requestInput: input }, () => {
      let documentType: DocumentType = "voided-document";
      this.createDocument(documentType, input);
      this.enrichDocument(documentType, input);
    });
  };

  render() {
    const { formType } = this.props;
    const {
      requestInput,
      responseEnrichedOutput,
      responseXMLOutput
    } = this.state;

    let form;
    switch (formType) {
      case "standard-document":
        form = (
          <FormStandardDocument
            onSubmit={this.handleFormStandardDocumentSubmit}
          />
        );
        break;
      case "voided-document":
        form = (
          <FormVoidedDocument onSubmit={this.handleFormVoidedDocumentSubmit} />
        );
        break;
      default:
        form = <small>No valid form type</small>;
    }

    return (
      <Grid lg={2} gutter="sm">
        <GridItem span={8}>
          <SplitItem>
            <Card>
              <CardHeader>Datos del comprobante de pago</CardHeader>
              <CardBody>{form}</CardBody>
            </Card>
          </SplitItem>
        </GridItem>
        <GridItem span={4}>
          <SplitItem>
            <DocumentRequestResponseViewer
              requestObj={requestInput}
              responseEnrichedObj={responseEnrichedOutput}
              responseXML={{
                xml: responseXMLOutput ? responseXMLOutput.xml : "",
                filename: responseXMLOutput ? responseXMLOutput.filename : ""
              }}
            />
          </SplitItem>
        </GridItem>
      </Grid>
    );
  }
}

export default DocumentCreate;
