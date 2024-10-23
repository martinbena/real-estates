export async function fetchEstates(apiPage: string = "1") {
  try {
    const url =
      typeof window === "undefined"
        ? "https://www.sreality.cz/api/cs/v2/estates"
        : `/api/proxy?page=${apiPage}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error("Chyba při načítání nemovitostí");

    return data._embedded.estates;
  } catch (err) {
    throw err;
  }
}
