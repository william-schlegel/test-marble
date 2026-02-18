import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { FormulaType } from "./FormulaExpressionContext";

type FormulaExpressionsMapContextValue = {
  expressions: Map<string, { name: string; formula: FormulaType }>;
  addExpression: (name: string, formula: FormulaType) => void;
  getExpressions: () => { name: string; formula: FormulaType }[];
  formula: () => string;
};

const FormulaExpressionsMapContext = createContext<
  FormulaExpressionsMapContextValue | undefined
>(undefined);

export function FormulaExpressionsMapProvider({
  children,
  initialIds = ["main"],
}: {
  children: ReactNode;
  initialIds?: string[];
}) {
  const [expressions, setExpressions] = useState<
    Map<string, { name: string; formula: FormulaType }>
  >(
    () =>
      new Map(
        initialIds.map((id) => [
          id,
          {
            name: id,
            formula: {
              val1: { key: null, value: "", type: "string" },
              val2: { key: null, value: "", type: "string" },
              operator: "",
              freeValue: null,
            } as FormulaType,
          },
        ])
      )
  );

  const addExpression = useCallback((name: string, formula: FormulaType) => {
    setExpressions((prev) => {
      const next = new Map(prev);
      next.set(name, { name, formula });
      return next;
    });
  }, []);

  const getExpressions = useCallback(() => {
    return Array.from(expressions.values());
  }, [expressions]);

  const formula = () => {
    let f = "";
    expressions.forEach((expression) => {
      if (expression.formula.val1)
        f +=
          expression.name +
          " " +
          expression.formula.operator +
          " " +
          expression.formula.val1.value +
          " " +
          expression.formula.val2.value +
          "\n";
    });
    return f;
  };

  return (
    <FormulaExpressionsMapContext.Provider
      value={{ expressions, addExpression, getExpressions, formula }}
    >
      {children}
    </FormulaExpressionsMapContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFormulaExpressionsMap() {
  const ctx = useContext(FormulaExpressionsMapContext);
  if (ctx === undefined) {
    throw new Error(
      "useFormulaExpressionsMap must be used within FormulaExpressionsMapProvider"
    );
  }
  return ctx;
}
