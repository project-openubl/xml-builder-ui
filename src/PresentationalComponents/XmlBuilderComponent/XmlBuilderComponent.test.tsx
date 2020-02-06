import React from "react";
import { shallow } from "enzyme";
import XmlBuilderComponent from "./XmlBuilderComponent";
import { Button } from "@patternfly/react-core";
import { ENV_SIGNER_MODE } from "../../Utilities/EnvUtils";

class SignerModeComponent extends React.Component<{}, {}> {
  render() {
    return <p>Hello</p>;
  }
}

class NoSignerModeComponent extends React.Component<{}, {}> {
  render() {
    return <p>Hola</p>;
  }
}

afterEach(() => {
  delete process.env[ENV_SIGNER_MODE];
});

it("[ENV_SIGNER_MODE=true] Render component", () => {
  process.env = Object.assign(process.env, { [ENV_SIGNER_MODE]: "true" });

  const wrapper = shallow(
    <XmlBuilderComponent whenSignerMode={SignerModeComponent} />
  );
  expect(wrapper).toMatchSnapshot();
});

it("[ENV_SIGNER_MODE=true] Render component with children", () => {
  process.env = Object.assign(process.env, { [ENV_SIGNER_MODE]: "true" });

  const wrapper = shallow(
    <XmlBuilderComponent whenSignerMode={SignerModeComponent}>
      <p>Component children</p>
    </XmlBuilderComponent>
  );
  expect(wrapper).toMatchSnapshot();
});

it("[ENV_SIGNER_MODE=false] Render ELSE component", () => {
  process.env = Object.assign(process.env, { [ENV_SIGNER_MODE]: "false" });

  const wrapper = shallow(
    <XmlBuilderComponent
      whenSignerMode={SignerModeComponent}
      elseMode={NoSignerModeComponent}
    >
      <p>Component children</p>
    </XmlBuilderComponent>
  );
  expect(wrapper).toMatchSnapshot();
});

it("[ENV_SIGNER_MODE=false] Render ELSE empty component", () => {
  process.env = Object.assign(process.env, { [ENV_SIGNER_MODE]: "false" });

  const wrapper = shallow(
    <XmlBuilderComponent whenSignerMode={SignerModeComponent}>
      <p>Component children</p>
    </XmlBuilderComponent>
  );
  expect(wrapper).toMatchSnapshot();
});
