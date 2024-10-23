import { act, fireEvent, render, screen } from "@testing-library/react";
import { toast } from "react-hot-toast";
import { describe, expect, it, jest } from "@jest/globals";
import { mockEstatesContext } from "../__mocks__/EstatesContextMock";
import AddEditForm from "../components/forms/AddEditForm";
import ConfirmDelete from "../components/forms/ConfirmDelete";
import { EstatesContext } from "../context/EstatesContext";

const spy = jest.spyOn(toast, "success");

describe("Toast notifications", () => {
  it("should show toast notification on estate addition", async () => {
    render(
      <EstatesContext.Provider
        value={{
          ...mockEstatesContext,
          isFormOpen: true,
          addEstate: () => toast.success("Nemovitost úspěšně přidána."),
        }}
      >
        <AddEditForm />
      </EstatesContext.Provider>
    );
    fireEvent.change(screen.getByLabelText("Název inzerátu"), {
      target: { value: "Prodej bytu" },
    });
    fireEvent.change(screen.getByLabelText("Lokace"), {
      target: { value: "Praha" },
    });
    fireEvent.change(screen.getByLabelText("Cena"), {
      target: { value: "3000000" },
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Přidat"));
    });

    expect(spy).toHaveBeenCalledWith("Nemovitost úspěšně přidána.");
  });

  it("should show toast notification on estate deletion", async () => {
    const deleteEstateMock = jest.fn(() =>
      toast.success("Nemovitost úspěšně smazána.")
    );

    render(
      <EstatesContext.Provider value={mockEstatesContext}>
        <ConfirmDelete
          isOpen={true}
          onClose={jest.fn()}
          onConfirm={deleteEstateMock}
        />
      </EstatesContext.Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Smazat"));
    });

    expect(spy).toHaveBeenCalledWith("Nemovitost úspěšně smazána.");
  });
});
