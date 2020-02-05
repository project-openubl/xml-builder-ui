import React from "react";
import { isAppInSignerMode } from "../../Utilities/EnvUtils";

interface Props {
  whenSignerComponent: any;
  elseComponent?: any;
}

interface State {}

class XmlBuilderComponent extends React.Component<Props, State> {
  render() {
    const {
      children,
      whenSignerComponent: SignerComponent,
      elseComponent: NoSignerComponent,
      ...rest
    } = this.props;

    if (isAppInSignerMode()) {
      return <SignerComponent {...rest}>{children}</SignerComponent>;
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
