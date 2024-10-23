"use client";

import useEstateContext from "@/hooks/useEstateContext";
import { Box, Button } from "@mui/material";

export default function LoadMoreButton() {
  const { loadMoreEstates, state } = useEstateContext();
  const { loadingMore } = state;

  return (
    <Box sx={{ textAlign: "center", mt: "1rem" }}>
      <Button
        variant="outlined"
        onClick={() => loadMoreEstates()}
        disabled={loadingMore}
      >
        {loadingMore ? "Načítám..." : "Načíst další"}
      </Button>
    </Box>
  );
}
