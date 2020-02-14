import React from "react";
import ProviderManager from "../../../SmartComponents/ProviderManager";

interface Props {}

interface State {}

export class PageProvider extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        <ProviderManager />
      </React.Fragment>
    );
  }
}
