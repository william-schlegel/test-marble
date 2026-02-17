import { createContext, useContext, useState, type ReactNode } from "react";
import {
  type Variable,
  type Operator,
  type VariableType,
  getVariableByName,
} from "@/lib/data";

type ValidValue = Variable["name"] | "free" | null;

type FormulaExpressionContextValue = {
  values: ValidValue[];
  operator: Operator["name"] | null;
  setValue: (index: number, v: Variable["name"] | null) => void;
  setOperator: (o: Operator["name"] | null) => void;
  typeConstraint: VariableType | null;
  freeValue: { value: string; type: VariableType } | null;
  setFreeValue: (v: { value: string; type: VariableType } | null) => void;
  reset: () => void;
};

const FormulaExpressionContext = createContext<
  FormulaExpressionContextValue | undefined
>(undefined);

export function FormulaExpressionProvider({
  children,
}: {
  children: ReactNode;
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
