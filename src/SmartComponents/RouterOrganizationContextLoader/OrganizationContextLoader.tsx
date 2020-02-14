import React from "react";
import { FetchStatus } from "../../store/common";
import { AxiosError } from "axios";
import { Bullseye, PageSection } from "@patternfly/react-core";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

interface StateToProps {
  cxtOrganizationsError: AxiosError<any> | null;
  cxtOrganizationsStatus: FetchStatus | null;
}

interface DispatchToProps {
  fetchCtxOrganizations: () => any;
}

interface Props extends StateToProps, DispatchToProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

interface State {}

class RouterOrganizationContextLoader extends React.Component<Props, State> {
  componentDidMount() {
    const { fetchCtxOrganizations } = this.props;
    fetchCtxOrganizations();
  }

  renderLoading = () => {
    return (
      <PageSection>
        <Bullseye>Loading...</Bullseye>
      </PageSection>
    );
  };

  render() {
    const {
      cxtOrganizationsStatus,
      cxtOrganizationsError,
      component: Component,
      ...rest
    } = this.props;

    if (cxtOrganizationsError) {
      return <Route {...rest} render={() => <Redirect to="/error503" />} />;
    }

    switch (cxtOrganizationsStatus) {
      case "complete":
        return <Route {...rest} component={Component} />;
      default:
        return <Route {...rest} render={this.renderLoading} />;
    }
  }
}

export default RouterOrganizationContextLoader;
