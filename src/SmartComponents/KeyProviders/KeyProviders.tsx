import React from "react";
import { AxiosError } from "axios";
import {
  IRow,
  ICell,
  Table,
  TableHeader,
  TableBody,
  IAction
} from "@patternfly/react-table";
import {
  Button,
  Card,
  CardHeader,
  Toolbar,
  ToolbarGroup,
  ToolbarItem
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";
import { Link } from "react-router-dom";
import { FetchStatus } from "../../store/common";
import {
  ComponentRepresentation,
  ServerInfoRepresentation,
  ComponentTypeRepresentation
} from "../../models/xml-builder";
import { XmlBuilderRouterProps } from "../../models/routerProps";
import { deleteDialogActions } from "../../store/deleteDialog";
import { TableEmpty, TableError, TableSkeleton } from "xml-builder-react";

interface StateToProps {
  serverInfo: ServerInfoRepresentation | undefined;
  serverInfoFetchStatus: FetchStatus | undefined;
  serverInfoError: AxiosError<any> | undefined;
  organizationComponents: ComponentRepresentation[];
  organizationComponentsFetchStatus: FetchStatus | undefined;
  organizationComponentsError: AxiosError<any> | undefined;
}

interface DispatchToProps {
  fetchServerInfo: () => any;
  fetchOrganizationComponents: (organizationId: string) => any;
  requestDeleteComponent: (organizationId: string, componentId: string) => any;
  showDeleteDialog: typeof deleteDialogActions.openModal;
  closeDeleteDialog: typeof deleteDialogActions.closeModal;
}

interface Props extends StateToProps, DispatchToProps, XmlBuilderRouterProps {
  organizationId: string;
}

interface State {
  rows: IRow[];
  columns: ICell[];
  actions: IAction[];
}

class KeyProviders extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rows: [],
      columns: [
        { title: "Nombre" },
        { title: "Kid" },
        { title: "Proveedor" },
        { title: "Prioridad" }
      ],
      actions: [
        {
          title: "Editar",
          onClick: (event, rowId) => {
            const component = this.props.organizationComponents[rowId];
            this.handleEditar(component);
          }
        },
        {
          title: "Eliminar",
          onClick: (event, rowId) => {
            const component = this.props.organizationComponents[rowId];
            this.handleDelete(component);
          }
        }
      ]
    };
  }

  componentDidMount() {
    this.loadSystemInfoAndComponents();
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (
      _prevProps.organizationComponents !== this.props.organizationComponents
    ) {
      this.filtersInRowsAndCells();
    }
  }

  loadSystemInfoAndComponents = () => {
    const { fetchServerInfo, fetchOrganizationComponents } = this.props;
    fetchServerInfo();
    fetchOrganizationComponents(this.props.organizationId);
  };

  filtersInRowsAndCells = (
    components: ComponentRepresentation[] = this.props.organizationComponents
  ) => {
    const rows: (IRow | string[])[] = components.map(
      (component: ComponentRepresentation) => ({
        cells: [
          {
            title: component.name
          },
          {
            title: (
              <Link key={component.id} to={this.getComponentEditUrl(component)}>
                {component.id}
              </Link>
            )
          },
          {
            title: component.providerId
          },
          {
            title: component.config["priority"][0]
          }
        ]
      })
    );

    this.setState({
      rows
    });
  };

  // handle

  getComponentEditUrl = (component: ComponentRepresentation) => {
    const { match } = this.props;
    return `${match.url}/${component.providerId}/${component.id}`;
  };

  handleEditar = (component: ComponentRepresentation) => {
    const { history } = this.props;
    history.push(this.getComponentEditUrl(component));
  };

  handleDelete = (component: ComponentRepresentation) => {
    const {
      showDeleteDialog,
      closeDeleteDialog,
      requestDeleteComponent
    } = this.props;

    showDeleteDialog({
      name: component.name,
      type: "component",
      onDelete: () => {
        requestDeleteComponent(this.props.organizationId, component.id).then(
          () => {
            closeDeleteDialog();
            this.loadSystemInfoAndComponents();
          }
        );
      },
      onCancel: () => {
        closeDeleteDialog();
      }
    });
  };

  // render

  renderTable = () => {
    const { columns, rows, actions } = this.state;
    const {
      serverInfoError,
      organizationComponentsError,
      serverInfoFetchStatus,
      organizationComponentsFetchStatus
    } = this.props;

    if (
      serverInfoFetchStatus !== "complete" ||
      organizationComponentsFetchStatus !== "complete"
    ) {
      return <TableSkeleton columns={columns} rowSize={5} />;
    }

    if (serverInfoError || organizationComponentsError) {
      const retry = () => {
        this.loadSystemInfoAndComponents();
      };
      return <TableError columns={columns} onRetry={retry} />;
    }

    if (rows.length === 0) {
      return <TableEmpty columns={columns} />;
    }

    return (
      <React.Fragment>
        <Table
          aria-label="Keys List Table"
          cells={columns}
          rows={rows}
          actions={actions}
        >
          <TableHeader />
          <TableBody />
        </Table>
      </React.Fragment>
    );
  };

  render() {
    const { serverInfo, match } = this.props;

    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <Toolbar className="pf-l-toolbar pf-u-justify-content-space-between pf-u-mx-xl pf-u-my-md">
              <ToolbarGroup>
                <ToolbarItem className="pf-u-mr-xl"></ToolbarItem>
              </ToolbarGroup>
              <ToolbarGroup>
                {serverInfo && (
                  <React.Fragment>
                    {serverInfo.componentTypes.keyProviders
                      .sort((a, b) => a.id.localeCompare(b.id))
                      .map((provider: ComponentTypeRepresentation) => (
                        <ToolbarItem key={provider.id} className="pf-u-mx-md">
                          <Link to={`${match.url}/${provider.id}`}>
                            <Button variant="link" icon={<PlusCircleIcon />}>
                              {provider.id}
                            </Button>
                          </Link>
                        </ToolbarItem>
                      ))}
                  </React.Fragment>
                )}
              </ToolbarGroup>
            </Toolbar>
          </CardHeader>
        </Card>
        {this.renderTable()}
      </React.Fragment>
    );
  }
}

export default KeyProviders;
