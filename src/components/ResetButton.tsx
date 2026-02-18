import { Button } from "./ui/button";
import { useFormulaExpression } from "../contexts/FormulaExpressionContext";

export default function ResetButton() {
  const { reset } = useFormulaExpression();

  return (
    <Button variant="outline" onClick={reset}>
      reset
    </Button>
  );
}
