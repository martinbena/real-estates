"use client";

import { ACTIONS } from "../config/constants";
import { Estate } from "../types/estate";
import { Action, State } from "../types/estateContext";

export const initialState: State = {
  estates: [],
  sortBy: "default",
  filterBy: "Vše",
  searchTerm: "",
  page: 0,
  loadingMore: false,
  apiPage: 2,
};

export function estatesReducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.SET_ESTATES:
      return { ...state, estates: action.payload as Estate[] };
    case ACTIONS.ADD_ESTATE:
      return {
        ...state,
        estates: [action.payload as Estate, ...state.estates],
      };
    case ACTIONS.LOAD_MORE_ESTATES:
      return {
        ...state,
        estates: [...state.estates, ...(action.payload as Estate[])],
      };
    case ACTIONS.EDIT_ESTATE:
      return {
        ...state,
        estates: state.estates.map((estate) =>
          estate.hash_id === (action.payload as Estate).hash_id
            ? (action.payload as Estate)
            : estate
        ),
      };
    case ACTIONS.DELETE_ESTATE:
      return {
        ...state,
        estates: state.estates.filter(
          (estate) => estate.hash_id !== action.payload
        ),
      };
    case ACTIONS.SORT_BY:
      return { ...state, sortBy: action.payload as string };
    case ACTIONS.FILTER_BY:
      return { ...state, filterBy: action.payload as string, page: 0 };
    case ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload as string, page: 0 };
    case ACTIONS.SET_PAGE:
      return { ...state, page: action.payload as number };
    case ACTIONS.SET_LOADING_MORE:
      return { ...state, loadingMore: action.payload as boolean };
    case ACTIONS.SET_API_PAGE:
      return { ...state, apiPage: action.payload as number };
    default:
      return state;
  }
}
