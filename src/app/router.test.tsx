import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderRoute } from "@/test/utils";

describe("app routes", () => {
  it("shows the rates page at /rates", async () => {
    renderRoute("/rates");

    expect(
      await screen.findByRole("heading", { name: "Latest Exchange Rates" }),
    ).toBeInTheDocument();
  });

  it("shows page not found at an unknown url", () => {
    renderRoute("/banana");

    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
  });

  it("clicking Rates navigates there and marks the link as current", async () => {
    const user = userEvent.setup();
    renderRoute("/");

    const ratesLink = screen.getByRole("link", { name: "Rates" });
    expect(ratesLink).not.toHaveAttribute("aria-current");

    await user.click(ratesLink);

    expect(
      await screen.findByRole("heading", { name: "Latest Exchange Rates" }),
    ).toBeInTheDocument();
    expect(ratesLink).toHaveAttribute("aria-current", "page");
  });
});
