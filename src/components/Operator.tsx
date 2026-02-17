import { useFormulaExpression } from "@/contexts/FormulaExpressionContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getOperators, type Operator } from "@/lib/data";

export default function Operator() {
  const { operator, setOperator, typeConstraint } = useFormulaExpression();

  return (
    <Select value={operator ?? ""} onValueChange={setOperator}>
      <SelectTrigger>
        <SelectValue placeholder="Select operator" />
      </SelectTrigger>
      <SelectContent>
        {getOperators(typeConstraint).map((operator) => (
          <SelectItem key={operator.name} value={operator.name}>
            {operator.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
