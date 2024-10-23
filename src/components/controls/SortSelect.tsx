"use client";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useEstateContext from "../../hooks/useEstateContext";

export default function SortSelect() {
  const { state, dispatch, ACTIONS } = useEstateContext();
  const { sortBy } = state;

  function handleChange(event: SelectChangeEvent<string>) {
    dispatch({ type: ACTIONS.SORT_BY, payload: event.target.value });
  }

  return (
    <FormControl
      size="small"
      sx={{
        maxWidth: 300,
        width: "100%",
        justifySelf: { sm: "end", xs: "start" },
      }}
    >
      <InputLabel
        sx={{ margin: "5px 0 0 5px" }}
        variant="standard"
        id="sort-select-label"
      >
        Řadit podle:
      </InputLabel>
      <Select
        sx={{ textAlign: "center" }}
        labelId="sort-select-label"
        value={sortBy}
        onChange={(e) => handleChange(e)}
      >
        <MenuItem value="default">Výchozí</MenuItem>
        <MenuItem value="priceAsc">Cena: Od nejnižší</MenuItem>
        <MenuItem value="priceDesc">Cena: Od nejvyšší</MenuItem>
        <MenuItem value="localityAsc">Lokalita: A-Z</MenuItem>
        <MenuItem value="localityDesc">Lokalita: Z-A</MenuItem>
      </Select>
    </FormControl>
  );
}
