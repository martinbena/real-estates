"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS } from "../config/constants";
import { Estate } from "../types/estate";
import {
  EstatesProviderProps,
  EstatesContextProps,
} from "../types/estateContext";
import { estatesReducer, initialState } from "./estatesReducer";

export const EstatesContext = createContext<EstatesContextProps | undefined>(
  undefined
);

export function EstatesProvider({
  children,
  initialEstates,
}: EstatesProviderProps) {
  const [state, dispatch] = useReducer(estatesReducer, {
    ...initialState,
    estates: initialEstates,
  });

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedEstate, setSelectedEstate] = useState<Estate | null>(null);

  function openForm(estate?: Estate) {
    setSelectedEstate(estate || null);
    setIsFormOpen(true);
  }

  function closeForm() {
    setSelectedEstate(null);
    setIsFormOpen(false);
  }

  const addEstate = useCallback(
    (data: Omit<Estate, "hash_id">) => {
      const newEstate: Estate = { ...data, hash_id: uuidv4() };
      dispatch({ type: ACTIONS.ADD_ESTATE, payload: newEstate });
      toast.success("Nemovitost úspěšně přidána.");
    },
    [dispatch]
  );

  const editEstate = useCallback(
    (updatedEstate: Estate) => {
      dispatch({ type: ACTIONS.EDIT_ESTATE, payload: updatedEstate });
      toast.success("Nemovitost úspěšně upravena.");
    },
    [dispatch]
  );

  const deleteEstate = useCallback(
    (id: string) => {
      dispatch({ type: ACTIONS.DELETE_ESTATE, payload: id });
      toast.success("Nemovitost úspěšně smazána.");
    },
    [dispatch]
  );

  function loadMoreEstates() {
    dispatch({ type: ACTIONS.SET_LOADING_MORE, payload: true });
    dispatch({ type: ACTIONS.SET_API_PAGE, payload: state.apiPage + 1 });
  }

  const { estates, filterBy, sortBy, searchTerm } = state;

  const filteredAndSortedItems = useMemo(() => {
    const searched = estates.filter(
      (estate) =>
        estate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estate.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        estate.price.toString().includes(searchTerm)
    );

    const filtered = searched.filter((estate) =>
      filterBy === "Vše" ? true : estate.name.includes(filterBy)
    );

    switch (sortBy) {
      case "priceAsc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "priceDesc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "localityAsc":
        return [...filtered].sort((a, b) =>
          a.locality.localeCompare(b.locality)
        );
      case "localityDesc":
        return [...filtered].sort((a, b) =>
          b.locality.localeCompare(a.locality)
        );
      default:
        return filtered;
    }
  }, [estates, filterBy, sortBy, searchTerm]);

  return (
    <EstatesContext.Provider
      value={{
        state,
        dispatch,
        ACTIONS,
        currentEstates: filteredAndSortedItems,
        isFormOpen,
        openForm,
        closeForm,
        selectedEstate,
        addEstate,
        editEstate,
        deleteEstate,
        loadMoreEstates,      
      }}
    >
      {children}
    </EstatesContext.Provider>
  );
}
