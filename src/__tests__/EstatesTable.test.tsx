import { render, screen } from "@testing-library/react";
import EstatesTable from "../components/table/EstatesTable";
import { EstatesContext } from "../context/EstatesContext";
import { describe, expect, it } from "@jest/globals";
import { mockEstatesContext } from "../__mocks__/EstatesContextMock";

describe("EstatesTable", () => {
  it("renders estate data", () => {
    render(
      <EstatesContext.Provider
        value={{
          ...mockEstatesContext,
          currentEstates: [
            {
              hash_id: "1",
              name: "Test Estate",
              price: 1000000,
              locality: "Praha",
            },
          ],
        }}
      >
        <EstatesTable />
      </EstatesContext.Provider>
    );

    expect(screen.getByText("Test Estate")).toBeInTheDocument();
    expect(screen.getByText("Praha")).toBeInTheDocument();
    expect(screen.getByText("1000000 Kč")).toBeInTheDocument();
  });

  it("displays message when no results are found", () => {
    render(
      <EstatesContext.Provider value={mockEstatesContext}>
        <EstatesTable />
      </EstatesContext.Provider>
    );

    expect(
      screen.getByText(/Nebyly nalezeny žádné výsledky/)
    ).toBeInTheDocument();
  });
});
