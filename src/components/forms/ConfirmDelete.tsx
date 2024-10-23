import { Box, Button } from "@mui/material";
import ModalWindow from "../ui/ModalWindow";

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmDeleteProps) {
  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={onClose}
      title="Opravdu chcete smazat tuto položku?"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Smazat
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Zrušit
        </Button>
      </Box>
    </ModalWindow>
  );
}
