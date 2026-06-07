"use client";
import { useState, useCallback } from "react";

export function useCalculator(config) {
  const initialValues = () =>
    Object.fromEntries(config.inputs.map((i) => [i.name, ""]));

  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState(null);

  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => {
        const next = { ...prev, [name]: value };
        try {
          const res = config.calculate(next);
          setResult(res);
        } catch {
          setResult(null);
        }
        return next;
      });
    },
    [config]
  );

  const reset = useCallback(() => {
    setValues(initialValues());
    setResult(null);
  }, []); // eslint-disable-line

  return { values, result, handleChange, reset };
}
