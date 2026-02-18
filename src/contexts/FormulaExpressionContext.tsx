import { createContext, useContext, useState, type ReactNode } from "react";
import {
  type Variable,
  type Operator,
  type VariableType,
  getVariableByName,
  FreeKey,
  FormulaKey,
} from "@/lib/data";

export type ValidValue =
  | Variable["name"]
  | typeof FreeKey
  | typeof FormulaKey
  | null;

type FormulaExpressionContextValue = {
  name: string | null;
  formula: FormulaType | null;
  values: ValidValue[];
  operator: Operator["name"] | null;
  setValue: (index: number, v: ValidValue) => void;
  setOperator: (o: Operator["name"] | null) => void;
  typeConstraint: VariableType | null;
  freeValue: { value: string; type: VariableType } | null;
  setFreeValue: (v: { value: string; type: VariableType } | null) => void;
  reset: () => void;
};

export type FormulaType = {
  val1: { key: ValidValue; value: string; type: VariableType };
  val2: { key: ValidValue; value: string; type: VariableType };
  operator: Operator["name"];
  freeValue: { value: string; type: VariableType } | null;
};

const FormulaExpressionContext = createContext<
  FormulaExpressionContextValue | undefined
>(undefined);

export function FormulaExpressionProvider({
  children,
  name,
}: {
  children: ReactNode;
  name: string | null;
}) {
  const [values, setValuesState] = useState<ValidValue[]>([null, null]);
  const [operator, setOperator] = useState<Operator["name"] | null>(null);
  const [typeConstraint, setTypeConstraint] = useState<VariableType | null>(
    null
  );
  const [freeValueState, setFreeValueState] = useState<{
    value: string;
    type: VariableType;
  } | null>(null);

  const setValue = (index: number, v: ValidValue) => {
    setValuesState((prev) => {
      const next = [...prev];
      next[index] = v;
      return next;
    });
    if (index === 0) {
      const variable = getVariableByName(v ?? "");
      setTypeConstraint(variable?.type ?? null);
    }
  };

  const setFreeValue = (v: { value: string; type: VariableType } | null) => {
    setFreeValueState(v);
    setTypeConstraint(v?.type ?? null);
  };

  function reset() {
    setValuesState([null, null]);
    setOperator(null);
    setTypeConstraint(null);
    setFreeValueState(null);
  }

  const formula: FormulaType = {
    val1: {
      key: values[0],
      value: values[0] ?? "",
      type: typeConstraint ?? "string",
    },
    val2: {
      key: values[1],
      value: values[1] ?? "",
      type: typeConstraint ?? "string",
    },
    operator: operator ?? "",
    freeValue: freeValueState,
  };

  return (
    <FormulaExpressionContext.Provider
      value={{
        values,
        operator,
        setValue,
        setOperator,
        typeConstraint,
        freeValue: freeValueState,
        setFreeValue,
        reset,
        name,
        formula,
      }}
    >
      {children}
    </FormulaExpressionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFormulaExpression() {
  const ctx = useContext(FormulaExpressionContext);
  if (ctx === undefined) {
    throw new Error(
      "useFormulaExpression must be used within FormulaExpressionProvider"
    );
  }
  return ctx;
}
