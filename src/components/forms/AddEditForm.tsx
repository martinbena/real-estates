"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useEstateContext from "../../hooks/useEstateContext";
import { Estate } from "../../types/estate";
import ModalWindow from "../ui/ModalWindow";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(10, "Název musí mít alespoň 10 znaků")
    .required()
    .typeError("Zadejte název"),
  locality: yup
    .string()
    .min(2, "Lokace musí mít alespoň 2 znaky")
    .required()
    .typeError("Zadejte lokaci"),
  price: yup
    .number()
    .min(1, "Cena musí být alespoň 1")
    .required()
    .typeError("Zadejte cenu"),
});

export default function AddEditForm() {
  const { isFormOpen, closeForm, selectedEstate, addEstate, editEstate } =
    useEstateContext();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", locality: "", price: 0 },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (selectedEstate) {
      reset(selectedEstate);
    } else {
      reset({ name: "", locality: "", price: 0 });
    }
  }, [selectedEstate, reset]);

  function onSubmit(data: Partial<Estate> | Estate) {
    if (selectedEstate) {
      editEstate({ ...data } as Estate);
    } else {
      addEstate(data as Estate);
    }
    closeForm();
    reset();
  }

  return (
    <ModalWindow
      isOpen={isFormOpen}
      onClose={closeForm}
      title={selectedEstate ? "Editace nemovitosti" : "Přidání nemovitosti"}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Název inzerátu"
              placeholder="Prodej bytu 3+1"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="locality"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Lokace"
              placeholder="Praha"
              fullWidth
              margin="normal"
              error={!!errors.locality}
              helperText={errors.locality?.message}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Cena"
              type="number"
              placeholder="2000000"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {selectedEstate ? "Uložit změny" : "Přidat"}
        </Button>
      </Box>
    </ModalWindow>
  );
}
