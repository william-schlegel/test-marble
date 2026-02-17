// The FormulaExpression component has 3 different fields : Value Operator Value.
// Fields must be populated from the hardcoded lists above and in specific order.
// First value could be any data value
// operator must be a valid operator from the hardcoded lists above and acccording to the first value type
// Second value must be form the hardcoded lists above and according to the operator type.

import { FormulaExpressionProvider } from "@/contexts/FormulaExpressionContext";
import Operator from "./Operator";
import Value from "./Value";
import ResetButton from "@/contexts/ResetButton";

export default function FormulaExpression() {
  return (
    <FormulaExpressionProvider>
      <div className="flex gap-2">
        <Value index={0} />
        <Operator />
        <Value index={1} />
        <ResetButton />
      </div>
    </FormulaExpressionProvider>
  );
}
