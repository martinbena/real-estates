import TableControls from "../controls/TableControls";
import EstatesTable from "../table/EstatesTable";
import { EstatesProvider } from "../../context/EstatesContext";
import { fetchEstates } from "../../services/api";
import LoadMoreButton from "../controls/LoadMoreButton";

export default async function Estates() {
  const estates = await fetchEstates();

  return (
    <EstatesProvider initialEstates={estates}>
      <TableControls />
      <EstatesTable />
      <LoadMoreButton />
    </EstatesProvider>
  );
}
