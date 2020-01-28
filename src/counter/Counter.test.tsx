import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import Counter from "./CounterFull";

describe("<Counter/>", () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = shallow(<Counter />);
  });

  it("renders without crashing", () => {
    expect(component.debug()).toMatchSnapshot();
  });

  it("displays the initial count", () => {
    expect(component.text()).toContain("Current count is 0");
    expect(component.debug()).toMatchSnapshot();
  });

  it("counts up", () => {
    component.find("[data-testid='up']").simulate("click");
    expect(component.text()).toContain("Current count is 1");
    expect(component.debug()).toMatchSnapshot();
  });

  it("counts down", () => {
    component.find("[data-testid='down']").simulate("click");
    expect(component.text()).toContain("Current count is -1");
    expect(component.debug()).toMatchSnapshot();
  });

  it("resets count", () => {
    component.find("[data-testid='up']").simulate("click");
    component.find("[data-testid='up']").simulate("click");
    expect(component.text()).toContain("Current count is 2");
    expect(component.debug()).toMatchSnapshot();

    component.find("[data-testid='reset']").simulate("click");
    expect(component.text()).toContain("Current count is 0");
    expect(component.debug()).toMatchSnapshot();
  });
});
