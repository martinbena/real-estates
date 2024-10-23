import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../components/controls/Filter";
import { EstatesContext } from "../context/EstatesContext";
import { ACTIONS, FILTER_OPTIONS } from "../config/constants";
import { describe, expect, it } from "@jest/globals";
import { mockEstatesContext } from "../__mocks__/EstatesContextMock";

describe("Filter Component", () => {
  it("should dispatch correct filter action", () => {
    render(
      <EstatesContext.Provider value={mockEstatesContext}>
        <Filter />
      </EstatesContext.Provider>
    );
    const button = screen.getByText(FILTER_OPTIONS[1]);
    fireEvent.click(button);
    expect(mockEstatesContext.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.FILTER_BY,
      payload: FILTER_OPTIONS[1],
    });
  });
});
