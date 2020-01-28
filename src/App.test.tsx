import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./App";

test.skip("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it("renders", () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});
