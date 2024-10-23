"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useState } from "react";
import useEstateContext from "../../hooks/useEstateContext";
import { Estate } from "../../types/estate";
import ConfirmDelete from "../forms/ConfirmDelete";

interface UserActionsProps {
  estate: Estate;
}

export default function UserActions({ estate }: UserActionsProps) {
  const { openForm, deleteEstate } = useEstateContext();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <>
      <IconButton onClick={() => openForm(estate)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => setDeleteId(estate.hash_id)}>
        <DeleteIcon color="error" />
      </IconButton>

      <ConfirmDelete
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteEstate(deleteId);
          setDeleteId(null);
        }}
      />
    </>
  );
}
