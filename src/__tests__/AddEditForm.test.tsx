import { render, screen, fireEvent, act } from "@testing-library/react";
import AddEditForm from "../components/forms/AddEditForm";
import { EstatesContext } from "../context/EstatesContext";
import { mockEstatesContext } from "../__mocks__/EstatesContextMock";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

function renderWithContext() {
  render(
    <EstatesContext.Provider
      value={{ ...mockEstatesContext, isFormOpen: true }}
    >
      <AddEditForm />
    </EstatesContext.Provider>
  );
}

describe("AddEditForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show validation error on invalid input", async () => {
    renderWithContext();
    fireEvent.click(screen.getByText("Přidat"));
    expect(
      await screen.findByText("Název musí mít alespoň 10 znaků")
    ).toBeInTheDocument();
  });

  it("should call addEstate on valid input", async () => {
    renderWithContext();
    fireEvent.change(screen.getByLabelText("Název inzerátu"), {
      target: { value: "Prodej domu v Praze" },
    });
    fireEvent.change(screen.getByLabelText("Lokace"), {
      target: { value: "Praha" },
    });
    fireEvent.change(screen.getByLabelText("Cena"), {
      target: { value: "2000000" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Přidat"));
    });

    expect(mockEstatesContext.addEstate).toBeCalledWith({
      name: "Prodej domu v Praze",
      locality: "Praha",
      price: 2000000,
    });
    expect(mockEstatesContext.closeForm).toBeCalled();
  });
});
