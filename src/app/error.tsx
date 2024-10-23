"use client";

import { Box, Button, Typography } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <Typography variant="h6">Něco se pokazilo!</Typography>
      <Typography>{error.message}</Typography>
      <Button variant="contained" onClick={reset}>
        Opakovat
      </Button>
    </Box>
  );
}
