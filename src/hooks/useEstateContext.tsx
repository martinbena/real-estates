"use client";

import { useContext } from "react";
import { EstatesContext } from "../context/EstatesContext";

export default function useEstateContext() {
  const context = useContext(EstatesContext);
  if (!context) {
    throw new Error("useEstateContext must be used within an EstatesProvider");
  }
  return context;
}
