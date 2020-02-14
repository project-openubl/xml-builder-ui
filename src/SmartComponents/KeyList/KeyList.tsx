import React from "react";
import { AxiosError } from "axios";
import {
  IRow,
  ICell,
  cellWidth,
  Table,
  TableHeader,
  TableBody,
  expandable
} from "@patternfly/react-table";
import { ClipboardCopy } from "@patternfly/react-core";
import {
  ButtonViewModal,
  TableSkeleton,
  TableError,
  TableEmpty
} from "xml-builder-react";
import { FetchStatus } from "../../store/common";
import {
  ComponentRepresentation,
  KeysMetadataRepresentation,
  KeyMetadataRepresentation
} from "../../models/xml-builder";

interface StateToProps {
  organizationKeys: KeysMetadataRepresentation | undefined;
  organizationKeysFetchStatus: FetchStatus | undefined;
  organizationKeysError: AxiosError<any> | undefined;
  organizationComponents: ComponentRepresentation[];
  organizationComponentsFetchStatus: FetchStatus | undefined;
  organizationComponentsError: AxiosError<any> | undefined;
}

interface DispatchToProps {
  fetchOrganizationKeys: (organizationId: string) => any;
  fetchOrganizationComponents: (organizationId: string) => any;
}

export interface KeyListProps extends StateToProps, DispatchToProps {
  organizationId: string;
}

interface State {
  activeMap: Map<string, KeyMetadataRepresentation>;
  rows: IRow[];
  columns: ICell[];
}

class KeyList extends React.Component<KeyListProps, State> {
  constructor(props: KeyListProps) {
    super(props);
    this.state = {
      activeMap: new Map(),
      rows: [],
      columns: [
        { title: "Estatus", transforms: [], cellFormatters: [expandable] },
        { title: "Tipo", transforms: [] },
        { title: "Llave", transforms: [] },
        { title: "Prioridad", transforms: [] },
        { title: "Proveedor", transforms: [] },
        { title: "Llave pública", transforms: [cellWidth("10")] },
        { title: "Certificado", transforms: [cellWidth("10")] }
      ]
    };
  }

  componentDidMount() {
    this.loadKeysAndComponents();
  }

  componentDidUpdate(_prevProps: KeyListProps, prevState: State) {
    const { activeMap } = this.state;
    const { organizationKeys, organizationComponents } = this.props;

    if (
      organizationKeys &&
      organizationComponents &&
      organizationComponents.length > 0 &&
      activeMap.size === 0
    ) {
      this.processKeysAndComponents();
    }
  }

  loadKeysAndComponents = () => {
    const { fetchOrganizationKeys, fetchOrganizationComponents } = this.props;

    this.setState({ activeMap: new Map() }, () => {
      fetchOrganizationKeys(this.props.organizationId);
      fetchOrganizationComponents(this.props.organizationId);
    });
  };

  processKeysAndComponents = () => {
    const { organizationKeys, organizationComponents } = this.props;
    if (organizationKeys && organizationComponents) {
      const active: any = {};

      for (let i = 0; i < organizationKeys.keys.length; i++) {
        for (let j = 0; j < organizationComponents.length; j++) {
          const key: KeyMetadataRepresentation = organizationKeys.keys[i];
          const component: ComponentRepresentation = organizationComponents[j];
          if (key.providerId === component.id) {
            key.provider = organizationComponents[j];
          }
        }
      }

      for (const t in organizationKeys.active) {
        if (organizationKeys.active[t]) {
          for (let i = 0; i < organizationKeys.keys.length; i++) {
            if (organizationKeys.active[t] === organizationKeys.keys[i].kid) {
              active[t] = organizationKeys.keys[i];
            }
          }
        }
      }

      const activeMap: Map<string, KeyMetadataRepresentation> = new Map();
      for (const key in active) {
        if (active[key]) {
          activeMap.set(key, active[key]);
        }
      }

      this.setState({ activeMap: activeMap }, () => {
        this.filtersInRowsAndCells();
      });
    }
  };

  filtersInRowsAndCells = (
    map: Map<string, KeyMetadataRepresentation> = this.state.activeMap
  ) => {
    const rows: (IRow | string[])[] = [];

    let index: number = -1;
    map.forEach((key: KeyMetadataRepresentation) => {
      index++;

      rows.push(
        {
          isOpen: false,
          cells: [
            {
              title: key.status
            },
            {
              title: key.type
            },
            {
              title: key.kid
            },
            {
              title: key.providerPriority
            },
            {
              title: key.provider ? (
                <span>{key.provider.name}</span>
              ) : (
                <small>No provider identified</small>
              )
            },
            {
              title: (
                <ButtonViewModal
                  buttonLabel="Ver"
                  modalTitle="Llave pública"
                  modalContent={key.publicKey}
                />
              )
            },
            {
              title: (
                <ButtonViewModal
                  buttonLabel="Ver"
                  modalTitle="Certificado"
                  modalContent={key.certificate}
                />
              )
            }
          ]
        },
        {
          parent: index * 2,
          fullWidth: false,
          cells: [
            {
              title: (
                <React.Fragment>
                  <div className="pf-c-content">
                    <dl>
                      <dt>Llave pública</dt>
                      <dd>
                        <ClipboardCopy>{key.publicKey}</ClipboardCopy>
                      </dd>
                      <dt>Certificado</dt>
                      <dd>
                        <ClipboardCopy>{key.certificate}</ClipboardCopy>
                      </dd>
                    </dl>
                  </div>
                </React.Fragment>
              )
            }
          ]
        }
      );
    });

    this.setState({
      rows
    });
  };

  // handle

  handleOnTableCollapse = (_event: any, rowKey: number, isOpen: boolean) => {
    const { rows } = this.state;

    rows[rowKey].isOpen = isOpen;
    this.setState({ rows });
  };

  render() {
    const { columns, rows } = this.state;
    const {
      organizationKeysError,
      organizationComponentsError,
      organizationKeysFetchStatus,
      organizationComponentsFetchStatus
    } = this.props;

    if (
      organizationKeysFetchStatus !== "complete" ||
      organizationComponentsFetchStatus !== "complete"
    ) {
      return <TableSkeleton columns={columns} rowSize={5} />;
    }

    if (organizationKeysError || organizationComponentsError) {
      const retry = () => {
        this.loadKeysAndComponents();
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
          onCollapse={this.handleOnTableCollapse}
        >
          <TableHeader />
          <TableBody />
        </Table>
      </React.Fragment>
    );
  }
}

export default KeyList;
