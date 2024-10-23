import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Typography variant="h6">Tato stránka nebyla nalezena</Typography>
      <MuiLink component={Link} href="/">
        &larr; Zpět na domovskou stránku
      </MuiLink>
    </Box>
  );
}
