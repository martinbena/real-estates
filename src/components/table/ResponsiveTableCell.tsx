import { TableCell, Typography } from "@mui/material";
import { ReactNode } from "react";

interface ResponsiveTableCellProps {
  label?: string;
  value: string | ReactNode;
}

export default function ResponsiveTableCell({
  label,
  value,
}: ResponsiveTableCellProps) {
  return (
    <TableCell
      sx={{
        "@media (max-width: 56.24rem)": {
          display: "block",
          paddingBottom: "0.5rem",
        },
        borderBottom: "none",
      }}
    >
      {label && (
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            display: { xs: "inline-block", md: "none" },
            marginRight: "0.5rem",
            width: "7ch",
          }}
        >
          {label}:
        </Typography>
      )}
      <span>{value}</span>
    </TableCell>
  );
}
