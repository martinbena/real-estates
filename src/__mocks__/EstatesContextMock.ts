import { EstatesContextProps } from "../types/estateContext";
import { ACTIONS } from "../config/constants";
import { jest } from "@jest/globals";
import { initialState } from "@/context/estatesReducer";

export const mockEstatesContext: EstatesContextProps = {
  state: {
    ...initialState,
  },
  dispatch: jest.fn(),
  ACTIONS,
  isFormOpen: false,
  openForm: jest.fn(),
  closeForm: jest.fn(),
  currentEstates: [],
  selectedEstate: null,
  addEstate: jest.fn(),
  editEstate: jest.fn(),
  deleteEstate: jest.fn(),
  loadMoreEstates: jest.fn(),
};
