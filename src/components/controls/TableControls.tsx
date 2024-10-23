import { Box } from "@mui/material";
import AddEditForm from "../forms/AddEditForm";
import Filter from "./Filter";
import OpenFormButton from "./OpenFormButton";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";

export default function TableControls() {
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr 1fr", xs: "1fr" },
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <OpenFormButton />
        <SearchBar />
        <Filter />
        <SortSelect />
      </Box>
      <AddEditForm />
    </>
  );
}
