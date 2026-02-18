import type { FormulaType } from "@/contexts/FormulaExpressionContext";

export function renderFormula(formula: FormulaType | null) {
  if (!formula) return "";
  return `${formula.val1.value} ${formula.operator} ${formula.val2.value}`;
}
