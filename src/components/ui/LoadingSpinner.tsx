import { Box, CircularProgress } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
