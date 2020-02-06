import React from "react";
import { Table, TableHeader, TableBody, ICell } from "@patternfly/react-table";
import { ErrorCircleOIcon } from "@patternfly/react-icons";
import {
  Card,
  CardBody,
  Bullseye,
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStateSecondaryActions,
  Button
} from "@patternfly/react-core";

export interface Props {
  columns: (ICell | string)[];
  retryAction: (event?: any) => void;
}

export interface State {}

class ErrorTable extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <Table cells={this.props.columns} rows={[]} aria-label="Error table">
          <TableHeader />
          <TableBody />
        </Table>
        <Card>
          <CardBody>
            <Bullseye>
              <EmptyState>
                <EmptyStateIcon icon={ErrorCircleOIcon} />
                <Title headingLevel="h5" size="lg">
                  ¡Ocurrió un error durante la extracción de datos!.
                </Title>
                <EmptyStateBody>
                  Intente de nuevo o refresque la página.
                </EmptyStateBody>
                <EmptyStateSecondaryActions>
                  <Button
                    variant="link"
                    onClick={this.props.retryAction}
                  >
                    Intentar de nuevo
                  </Button>
                </EmptyStateSecondaryActions>
              </EmptyState>
            </Bullseye>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default ErrorTable;
