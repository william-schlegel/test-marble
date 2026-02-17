import { Button } from "../components/ui/button";
import { useFormulaExpression } from "./FormulaExpressionContext";

export default function ResetButton() {
  const { reset } = useFormulaExpression();

  return <Button onClick={reset}>reset</Button>;
}
