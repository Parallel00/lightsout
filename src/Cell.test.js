import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

describe("<Cell />", () => {
  let container;

  beforeEach(() => {
    // add a TR to the document created by the test
    // to avoid warnings in the test output
    // about appending a TD to a DIV
    const tr = document.createElement("tr");
    container = document.body.appendChild(tr);
  });

  it("renders without crashing", () => {
    render(<Cell />, { container });
  });

  it("matches snapshot when lit", () => {
    const { asFragment } = render(<Cell isLit={true} />, { container });
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot when not lit", () => {
    const { asFragment } = render(<Cell isLit={false} />, { container });
    expect(asFragment()).toMatchSnapshot();
  });
});
