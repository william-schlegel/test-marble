import {
  useFormulaExpression,
  type ValidValue,
} from "@/contexts/FormulaExpressionContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FormulaKey, FreeKey, getVariables, TypeList } from "@/lib/data";
import { Field, FieldContent, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useFormulaExpressionsMap } from "@/contexts/FormulaExpressionsMapContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import FormulaExpression from "./FormulaExpression";

type ValueProps = {
  index: number;
};

export default function Value({ index }: ValueProps) {
  const { values, setFreeValue, freeValue, setValue, typeConstraint, formula } =
    useFormulaExpression();
  const value = values[index] ?? null;
  const [isFree, setIsFree] = useState(false);
  const { addExpression } = useFormulaExpressionsMap();
  const [isFormula, setIsFormula] = useState(false);
  const [formulaName, setFormulaName] = useState<string | null>(null);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get("value") as string;
    setFreeValue({ value, type: typeConstraint ?? "string" });
    setIsFree(false);
  }

  const handleChange = (index: number, value: ValidValue) => {
    setValue(index, value);
    setIsFree(value === FreeKey);
    setIsFormula(value === FormulaKey);
  };

  if (isFormula)
    return (
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Field orientation="horizontal">
          <FieldLabel>Nom</FieldLabel>
          <FieldContent>
            <Input
              type="text"
              name="value"
              value={formulaName ?? ""}
              onChange={(e) => setFormulaName(e.target.value)}
              required
              placeholder="Nom de la formule"
            />
          </FieldContent>
        </Field>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" disabled={!formulaName}>
              Create formula
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {!!formulaName && (
              <FormulaExpression name={formulaName}>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (formulaName && formula)
                      addExpression(formulaName, formula);
                    setIsFormula(false);
                  }}
                >
                  Valider
                </Button>
              </FormulaExpression>
            )}
          </PopoverContent>
        </Popover>
      </form>
    );
  if (isFree)
    return (
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Field orientation="horizontal">
          <FieldContent>
            <Input type="text" name="value" />
          </FieldContent>
        </Field>
        <Select
          name="type"
          defaultValue={typeConstraint ?? "string"}
          disabled={!!typeConstraint}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {TypeList.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">Valider</Button>
      </form>
    );
  if (value === FreeKey)
    return (
      <div>
        {freeValue?.value} ({freeValue?.type})
      </div>
    );

  if (value === FormulaKey) return <div>{formulaName}</div>;

  return (
    <Select
      value={value ?? ""}
      onValueChange={(value) => handleChange(index, value as ValidValue)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a value" />
      </SelectTrigger>
      <SelectContent>
        {getVariables(typeConstraint).map((variable) => (
          <SelectItem key={variable.name} value={variable.name}>
            {variable.name}
          </SelectItem>
        ))}
        <SelectItem value={FreeKey}>Saisie libre</SelectItem>
        <SelectItem value={FormulaKey}>Formula</SelectItem>
      </SelectContent>
    </Select>
  );
}
