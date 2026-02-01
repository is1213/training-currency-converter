import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConversionHistory from "./ConversionHistory";
import { ConversionResult } from "@/types";

describe("ConversionHistory - Conditional Rendering", () => {
  const baseConversion: ConversionResult = {
    from: "USD",
    to: "EUR",
    amount: 100,
    result: 85,
    rate: 0.85,
    timestamp: 1672531200000, // Jan 1, 2023
  };

  it("shows clear button when history is not empty", () => {
    render(
      <ConversionHistory
        history={[baseConversion]}
        showHistory={true}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onLoadConversion={jest.fn()}
      />
    );
    expect(
      screen.getByRole("button", { name: /clear history/i })
    ).toBeInTheDocument();
  });

  it("does not show clear button when history is empty", () => {
    render(
      <ConversionHistory
        history={[]}
        showHistory={true}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onLoadConversion={jest.fn()}
      />
    );
    expect(
      screen.queryByRole("button", { name: /clear history/i })
    ).not.toBeInTheDocument();
  });

  it("shows empty state when history is empty and showHistory is true", () => {
    render(
      <ConversionHistory
        history={[]}
        showHistory={true}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onLoadConversion={jest.fn()}
      />
    );
    expect(screen.getByText(/no conversion history yet/i)).toBeInTheDocument();
  });

  it("does not show empty state when history is not empty", () => {
    render(
      <ConversionHistory
        history={[baseConversion]}
        showHistory={true}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onLoadConversion={jest.fn()}
      />
    );
    expect(
      screen.queryByText(/no conversion history yet/i)
    ).not.toBeInTheDocument();
  });

  it("shows history list when showHistory is true and history is not empty", () => {
    render(
      <ConversionHistory
        history={[baseConversion]}
        showHistory={true}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onLoadConversion={jest.fn()}
      />
    );
    expect(screen.getByText(/100.00 USD → 85.00 EUR/)).toBeInTheDocument();
  });

  it("does not show history list when showHistory is false", () => {
    render(
      <ConversionHistory
        history={[baseConversion]}
        showHistory={false}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onLoadConversion={jest.fn()}
      />
    );
    expect(
      screen.queryByText(/100.00 USD → 85.00 EUR/)
    ).not.toBeInTheDocument();
  });
});
describe("ConversionHistory - Button Interactions & Callbacks", () => {
  const baseConversion = {
    from: "USD",
    to: "EUR",
    amount: 100,
    result: 85,
    rate: 0.85,
    timestamp: 1672531200000,
  };

  it("calls onToggle when toggle button is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(
      <ConversionHistory
        history={[baseConversion]}
        showHistory={true}
        onToggle={onToggle}
        onClear={jest.fn()}
        onLoadConversion={jest.fn()}
      />
    );
    const toggleBtn = screen.getByRole("button", { name: /hide/i });
    await user.click(toggleBtn);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  describe("ConversionHistory - Dynamic Content", () => {
    const baseConversion = {
      from: "USD",
      to: "EUR",
      amount: 100,
      result: 85,
      rate: 0.85,
      timestamp: 1672531200000,
    };

    it('shows "Show" on toggle button when showHistory is false', () => {
      render(
        <ConversionHistory
          history={[baseConversion]}
          showHistory={false}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      expect(screen.getByRole("button", { name: /show/i })).toBeInTheDocument();
    });

    it('shows "Hide" on toggle button when showHistory is true', () => {
      render(
        <ConversionHistory
          history={[baseConversion]}
          showHistory={true}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      expect(screen.getByRole("button", { name: /hide/i })).toBeInTheDocument();
    });

    it("shows correct history count on toggle button", () => {
      render(
        <ConversionHistory
          history={[baseConversion, baseConversion]}
          showHistory={false}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      expect(screen.getByRole("button", { name: /show/i })).toHaveTextContent(
        "Show (2)"
      );
    });

    it("shows zero count on toggle button when history is empty", () => {
      render(
        <ConversionHistory
          history={[]}
          showHistory={false}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      expect(screen.getByRole("button", { name: /show/i })).toHaveTextContent(
        "Show (0)"
      );
    });
  });
  describe("ConversionHistory - Conversion Data Rendering", () => {
    const conversion: ConversionResult = {
      from: "USD",
      to: "EUR",
      amount: 123.45,
      result: 104.93,
      rate: 0.85,
      timestamp: 1672531200000, // Jan 1, 2023
    };

    it("renders amount and currency codes correctly", () => {
      render(
        <ConversionHistory
          history={[conversion]}
          showHistory={true}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      expect(screen.getByText(/123.45 USD → 104.93 EUR/)).toBeInTheDocument();
    });

    it("renders exchange rate with 4 decimals", () => {
      render(
        <ConversionHistory
          history={[conversion]}
          showHistory={true}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      expect(screen.getByText(/Rate: 1 USD = 0.8500 EUR/)).toBeInTheDocument();
    });

    it("renders timestamp in local string format", () => {
      render(
        <ConversionHistory
          history={[conversion]}
          showHistory={true}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      // The timestamp is Jan 1, 2023, 00:00:00 UTC
      const date = new Date(conversion.timestamp).toLocaleString();
      expect(screen.getByText(date)).toBeInTheDocument();
    });
  });

  describe("ConversionHistory - Edge Cases", () => {
    const conversion1: ConversionResult = {
      from: "USD",
      to: "EUR",
      amount: 100,
      result: 85,
      rate: 0.85,
      timestamp: 1672531200000, // Jan 1, 2023
    };
    const conversion2: ConversionResult = {
      from: "GBP",
      to: "JPY",
      amount: 50,
      result: 7500,
      rate: 150,
      timestamp: 1680307200000, // Apr 1, 2023
    };

    it("renders nothing but empty state when history is empty", () => {
      render(
        <ConversionHistory
          history={[]}
          showHistory={true}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      expect(
        screen.getByText(/no conversion history yet/i)
      ).toBeInTheDocument();
      expect(screen.queryByText(/USD/)).not.toBeInTheDocument();
      expect(screen.queryByText(/EUR/)).not.toBeInTheDocument();
    });

    it("renders multiple conversion items", () => {
      render(
        <ConversionHistory
          history={[conversion1, conversion2]}
          showHistory={true}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      expect(screen.getByText(/100.00 USD → 85.00 EUR/)).toBeInTheDocument();
      expect(screen.getByText(/50.00 GBP → 7500.00 JPY/)).toBeInTheDocument();
    });

    it("renders different timestamp formats correctly", () => {
      const ts1 = new Date(conversion1.timestamp).toLocaleString();
      const ts2 = new Date(conversion2.timestamp).toLocaleString();
      render(
        <ConversionHistory
          history={[conversion1, conversion2]}
          showHistory={true}
          onToggle={jest.fn()}
          onClear={jest.fn()}
          onLoadConversion={jest.fn()}
        />
      );
      expect(screen.getByText(ts1)).toBeInTheDocument();
      expect(screen.getByText(ts2)).toBeInTheDocument();
    });
  });

  it("calls onClear when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onClear = jest.fn();
    render(
      <ConversionHistory
        history={[baseConversion]}
        showHistory={true}
        onToggle={jest.fn()}
        onClear={onClear}
        onLoadConversion={jest.fn()}
      />
    );
    const clearBtn = screen.getByRole("button", { name: /clear history/i });
    await user.click(clearBtn);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("calls onLoadConversion when a history item is clicked", async () => {
    const user = userEvent.setup();
    const onLoadConversion = jest.fn();
    render(
      <ConversionHistory
        history={[baseConversion]}
        showHistory={true}
        onToggle={jest.fn()}
        onClear={jest.fn()}
        onLoadConversion={onLoadConversion}
      />
    );
    const historyItem = screen
      .getByText(/100.00 USD → 85.00 EUR/)
      .closest("div");
    await user.click(historyItem!);
    expect(onLoadConversion).toHaveBeenCalledWith(baseConversion);
  });
});
