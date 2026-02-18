import { useFormulaExpressionsMap } from "@/contexts/FormulaExpressionsMapContext";
import FormulaExpression from "./FormulaExpression";

export default function Expressions() {
  const { getExpressions } = useFormulaExpressionsMap();
  return (
    <div className="flex flex-col gap-2">
      {getExpressions().map((expression) => (
        <div key={expression.name} className="flex gap-2">
          <label>{expression.name}</label>
          <FormulaExpression name={expression.name} />
        </div>
      ))}
    </div>
  );
}
