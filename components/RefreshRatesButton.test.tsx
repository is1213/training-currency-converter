import { render, screen, fireEvent } from "@testing-library/react";
import RefreshRatesButton from "./RefreshRatesButton";

describe("RefreshRatesButton", () => {
  it("renders icon and is clickable", () => {
    const onClick = jest.fn();
    render(<RefreshRatesButton onClick={onClick} loading={false} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("shows spinner and disables when loading", () => {
    const onClick = jest.fn();
    render(<RefreshRatesButton onClick={onClick} loading={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.querySelector("svg.animate-spin")).toBeInTheDocument();
  });

  it("has correct aria-label", () => {
    render(
      <RefreshRatesButton
        onClick={() => {}}
        loading={false}
        ariaLabel="Refresh!"
      />
    );
    const button = screen.getByLabelText("Refresh!");
    expect(button).toBeInTheDocument();
  });
});
