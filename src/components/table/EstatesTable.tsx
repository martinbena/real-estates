"use client";

import { fetchEstates } from "@/services/api";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import {
  INITIAL_ROWS_PER_PAGE,
  TABLE_ROWS_PER_PAGE_OPTIONS,
} from "../../config/constants";
import useEstateContext from "../../hooks/useEstateContext";
import ResponsiveTableCell from "./ResponsiveTableCell";
import UserActions from "./UserActions";
import { SWRConfig } from "@/config/swrConfig";

export default function EstatesTable() {
  const theme = useTheme();
  const [rowsPerPage, setRowsPerPage] = useState<number>(INITIAL_ROWS_PER_PAGE);
  const { currentEstates, state, dispatch, ACTIONS } = useEstateContext();
  const { page, apiPage } = state;

  useSWR(apiPage.toString(), fetchEstates, {
    ...SWRConfig,
    onSuccess: (newData) => {
      dispatch({ type: ACTIONS.LOAD_MORE_ESTATES, payload: newData });
      dispatch({ type: ACTIONS.SET_LOADING_MORE, payload: false });
      toast.success("Data úspěšně načtena.");
    },
    onError: () => {
      dispatch({ type: ACTIONS.SET_LOADING_MORE, payload: false });
      toast.error("Chyba při načítání dat.");
    },
  });

  const minIndex = page * rowsPerPage;
  const maxIndex = page * rowsPerPage + rowsPerPage;

  function handleChangePage(_: unknown, newPage: number) {
    dispatch({ type: ACTIONS.SET_PAGE, payload: newPage });
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    dispatch({ type: ACTIONS.SET_PAGE, payload: 0 });
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
        }}
      >
        <Table>
          <TableHead
            sx={{
              display: { md: "table-header-group", xs: "none" },
              backgroundColor: theme.palette.action.disabledBackground,
            }}
          >
            <TableRow>
              <TableCell>Název</TableCell>
              <TableCell>Lokace</TableCell>
              <TableCell colSpan={2}>Cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentEstates.length > 0 ? (
              currentEstates.slice(minIndex, maxIndex).map((estate, index) => (
                <TableRow
                  key={estate.hash_id}
                  sx={{
                    backgroundColor:
                      index % 2 !== 0 ? theme.palette.action.hover : "inherit",
                  }}
                >
                  <ResponsiveTableCell label="Název" value={estate.name} />
                  <ResponsiveTableCell label="Lokace" value={estate.locality} />
                  <ResponsiveTableCell
                    label="Cena"
                    value={`${estate.price} Kč`}
                  />
                  <ResponsiveTableCell
                    value={<UserActions estate={estate} />}
                  ></ResponsiveTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="h6" color="textSecondary">
                    Nebyly nalezeny žádné výsledky.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={currentEstates.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={TABLE_ROWS_PER_PAGE_OPTIONS}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Zobrazit:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} ze ${count}`
                }
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
