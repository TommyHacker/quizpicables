/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ScoreBoard from ".";
import { Provider } from "react-redux";
import store from "../../redux-toolkit/store/store";
import { BrowserRouter as Router } from "react-router-dom";

describe("ScoreBoard", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <ScoreBoard />
        </Router>
      </Provider>
    );
  });

  test("Displays correct heading for Final Results", () => {
    const heading = screen.getByRole("headingForResults");
    expect(heading.textContent).toBe("Final Results");
    // expect(nav).toBeInTheDocument();
  });
});

// import { screen } from "@testing-library/react";

// import App from "../App";

// describe("testing the app", () => {
//   beforeEach(() => {
//     render(<App />);
//   });
//   test("should have an h1", async () => {
//     const h1 = screen.getByText("boilerplate application");
//     expect(h1.textContent).toBe("boilerplate application");
//   });
// });
