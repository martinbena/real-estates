"use client";

import { Button } from "@mui/material";
import useEstateContext from "../../hooks/useEstateContext";

export default function OpenFormButton() {
  const { openForm } = useEstateContext();

  return (
    <Button
      onClick={() => openForm()}
      sx={{
        width: 220,
        height: 40,
      }}
      variant="contained"
    >
      Přidat nemovitost
    </Button>
  );
}
