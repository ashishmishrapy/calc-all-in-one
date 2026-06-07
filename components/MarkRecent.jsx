"use client";
import { useEffect } from "react";
import { useCalculatorContext } from "@/context/CalculatorContext";

export default function MarkRecent({ id }) {
  const { markRecent } = useCalculatorContext();
  useEffect(() => {
    markRecent(id);
  }, [id]); // eslint-disable-line
  return null;
}
