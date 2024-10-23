"use client";

import { Button, ButtonGroup } from "@mui/material";
import { FILTER_OPTIONS } from "../../config/constants";
import useEstateContext from "../../hooks/useEstateContext";

export default function Filter() {
  const { dispatch, ACTIONS, state } = useEstateContext();
  const { filterBy } = state;

  function handleFilterChange(filter: string) {
    dispatch({ type: ACTIONS.FILTER_BY, payload: filter });
  }

  return (
    <ButtonGroup
      variant="contained"
      size="small"
      sx={{
        maxWidth: "max-content",
        height: 40,
        mb: { xs: "1rem", sm: "0" },
      }}
    >
      {FILTER_OPTIONS.map((category) => (
        <Button
          key={category}
          onClick={() => handleFilterChange(category)}
          color={filterBy === category ? "primary" : "inherit"}
        >
          {category}
        </Button>
      ))}
    </ButtonGroup>
  );
}
