import { ReactNode } from "react";
import { Estate } from "./estate";

export interface EstatesProviderProps {
  children: ReactNode;
  initialEstates: Estate[];
}

export interface State {
  estates: Estate[];
  sortBy: string;
  filterBy: string;
  searchTerm: string;
  page: number;
  loadingMore: boolean;
  apiPage: number;
}

export interface Action {
  type: string;
  payload: Estate | Estate[] | string | number | boolean;
}

export interface EstatesContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  ACTIONS: {
    SET_ESTATES: string;
    SORT_BY: string;
    FILTER_BY: string;
    SET_SEARCH_TERM: string;
    SET_PAGE: string;
    LOAD_MORE_ESTATES: string;
    SET_LOADING_MORE: string;
    SET_API_PAGE: string;
  };
  currentEstates: Estate[];
  isFormOpen: boolean;
  selectedEstate: Estate | null;
  openForm: (estate?: Estate) => void;
  closeForm: () => void;
  addEstate: (data: Omit<Estate, "hash_id">) => void;
  editEstate: (updatedEstate: Estate) => void;
  deleteEstate: (id: string) => void;
  loadMoreEstates: () => void;
}
