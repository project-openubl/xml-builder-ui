import React from "react";
import { shallow } from "enzyme";
import ErrorTable from "./ErrorTable";
import { Button } from "@patternfly/react-core";

it("Renders without crashing", () => {
  const retryAction = jest.fn();
  const wrapper = shallow(
    <ErrorTable
      columns={["column1", "column2", "column3"]}
      retryAction={retryAction}
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it("Retry action is called when button clicked", () => {
  const retryAction = jest.fn();
  const wrapper = shallow(
    <ErrorTable
      columns={["column1", "column2", "column3"]}
      retryAction={retryAction}
    />
  );

  wrapper.find(Button).simulate("click");
  expect(retryAction.mock.calls.length).toEqual(1);
});
