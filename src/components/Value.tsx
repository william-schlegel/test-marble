import { useFormulaExpression } from "@/contexts/FormulaExpressionContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getVariables, TypeList } from "@/lib/data";
import { Field, FieldContent } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

type ValueProps = {
  index: number;
};

export default function Value({ index }: ValueProps) {
  const { values, setFreeValue, freeValue, setValue, typeConstraint } =
    useFormulaExpression();
  const value = values[index] ?? null;
  const [isFree, setIsFree] = useState(false);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get("value") as string;
    setFreeValue({ value, type: typeConstraint ?? "string" });
    setIsFree(false);
  }

  const handleChange = (index: number, value: string | null) => {
    setValue(index, value ?? null);
    setIsFree(value === "free");
  };

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
  if (value === "free")
    return (
      <div>
        {freeValue?.value} ({freeValue?.type})
      </div>
    );

  return (
    <Select
      value={value ?? ""}
      onValueChange={(value) => handleChange(index, value ?? null)}
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
        <SelectItem value={"free"}>Saisie libre</SelectItem>
      </SelectContent>
    </Select>
  );
}
