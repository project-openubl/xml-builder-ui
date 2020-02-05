import React from "react";
import {
  Card,
  CardBody,
  Stack,
  StackItem,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Button,
  Tabs,
  Tab
} from "@patternfly/react-core";
import { FileIcon } from "@patternfly/react-icons";
import ReactJson from "react-json-view";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-xcode";

interface Props {
  inputDocument: any;
  xml: any;
  xmlFilename: string;
  enrichedData: any;
}

interface State {
  activeTab: number | string;
}

class GenericToolbarDocument extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  handleOnDownloadXml = () => {
    const { xml, xmlFilename } = this.props;
    const downloadUrl = window.URL.createObjectURL(new Blob([xml]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", xmlFilename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  handleOnTabClick = (event: any, tabIndex: number | string) => {
    this.setState({
      activeTab: tabIndex
    });
  };

  render() {
    const { inputDocument, enrichedData, xml } = this.props;
    const { activeTab } = this.state;
    return (
      <Card>
        <CardBody>
          <Stack gutter="sm">
            {inputDocument && (
              <StackItem>
                <Toolbar>
                  <ToolbarGroup>
                    <ToolbarItem>
                      <Button
                        variant="plain"
                        onClick={this.handleOnDownloadXml}
                      >
                        <FileIcon /> Descargar XML
                      </Button>
                    </ToolbarItem>
                  </ToolbarGroup>
                </Toolbar>
              </StackItem>
            )}
            <StackItem>
              <Tabs
                isFilled
                activeKey={activeTab}
                onSelect={this.handleOnTabClick}
              >
                <Tab eventKey={0} title="JSON Request">
                  <ReactJson src={inputDocument || {}} name={false} />
                </Tab>
                <Tab eventKey={1} title="JSON Response">
                  <ReactJson src={enrichedData} name={false} />
                </Tab>
                <Tab eventKey={2} title="XML Response">
                  <AceEditor
                    mode="xml"
                    theme="xcode"
                    onChange={() => {}}
                    name="xml"
                    editorProps={{ $blockScrolling: false }}
                    readOnly={true}
                    value={xml || ""}
                    width="100" // This value does not really affect but avoid horizontal overflow
                  />
                </Tab>
              </Tabs>
            </StackItem>
          </Stack>
        </CardBody>
      </Card>
    );
  }
}

export default GenericToolbarDocument;
