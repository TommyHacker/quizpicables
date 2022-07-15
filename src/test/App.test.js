/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/react";

import App from "../App";

describe("testing the app", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("should have an h1", async () => {
    const h1 = screen.getByText("boilerplate application");
    expect(h1.textContent).toBe("boilerplate application");
  });
});
