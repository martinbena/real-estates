import { render, screen, fireEvent } from "@testing-library/react";
import { EstatesContext } from "../context/EstatesContext";
import { ACTIONS } from "../config/constants";
import { describe, expect, it } from "@jest/globals";
import { mockEstatesContext } from "../__mocks__/EstatesContextMock";
import SearchBar from "../components/controls/SearchBar";

describe("SearchBar Component", () => {
  it("should dispatch search term change", () => {
    render(
      <EstatesContext.Provider value={mockEstatesContext}>
        <SearchBar />
      </EstatesContext.Provider>
    );
    const input = screen.getByPlaceholderText("Inzerát, lokace, cena...");
    fireEvent.change(input, { target: { value: "Praha" } });
    expect(mockEstatesContext.dispatch).toHaveBeenCalledWith({
      type: ACTIONS.SET_SEARCH_TERM,
      payload: "Praha",
    });
  });
});
