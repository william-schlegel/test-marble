import { useFormulaExpressionsMap } from "@/contexts/FormulaExpressionsMapContext";
import { renderFormula } from "@/lib/renderFormula";

export function FormulaValue({ name }: { name: string }) {
  const { expressions } = useFormulaExpressionsMap();
  console.log(name);
  console.log(expressions.get(name)?.formula);
  return (
    <div>
      <p>{renderFormula(expressions.get(name)?.formula ?? null)}</p>
    </div>
  );
}
