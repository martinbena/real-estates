"use client";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import useEstateContext from "../../hooks/useEstateContext";

export default function SearchBar() {
  const { dispatch, state, ACTIONS } = useEstateContext();
  const { searchTerm } = state;

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: event.target.value });
  }

  return (
    <TextField
      value={searchTerm}
      onChange={(e) => handleChange(e)}
      placeholder="Inzerát, lokace, cena..."
      variant="outlined"
      size="small"
      margin="normal"
      sx={{
        maxWidth: 300,
        width: "100%",
        justifySelf: { sm: "end", xs: "start" },

        pb: 1,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
