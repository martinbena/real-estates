import { Box, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";

interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function ModalWindow({
  isOpen,
  onClose,
  title,
  children,
}: ModalWindowProps) {
  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 400,
          minWidth: 250,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
}
