import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";

  try {
    const response = await fetch(
      `https://www.sreality.cz/api/cs/v2/estates?page=${page}`
    );

    if (!response.ok) {
      throw new Error("Chyba při načítání nemovitostí");
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Chyba při volání proxy API" },
      { status: 500 }
    );
  }
}
