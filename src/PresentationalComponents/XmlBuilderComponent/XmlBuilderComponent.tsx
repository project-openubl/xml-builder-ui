import React from "react";
import { isAppInSignerMode } from "../../Utilities/EnvUtils";

interface Props {
  whenSignerMode: React.ComponentType<any>;
  elseMode?: React.ComponentType<any>;
}

interface State {}

class XmlBuilderComponent extends React.Component<Props, State> {
  render() {
    const {
      children,
      whenSignerMode: SignerComponent,
      elseMode: NoSignerComponent
    } = this.props;

    if (isAppInSignerMode()) {
      return <SignerComponent>{children}</SignerComponent>;
    } else {
      if (NoSignerComponent) {
        return <NoSignerComponent>{children}</NoSignerComponent>;
      } else {
        return <React.Fragment>{children}</React.Fragment>;
      }
    }
  }
}

export default XmlBuilderComponent;
