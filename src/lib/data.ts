export const TypeList = ["int", "string", "boolean"] as const;

export type VariableType = (typeof TypeList)[number];
export type OperatorCategory = "Comparison" | "Arithmetic" | "Logical";

export type Variable = { name: string; type: VariableType };

const variablesData = [
  { name: "transaction.amount", type: "int" },
  { name: "transaction.account_name", type: "string" },
  { name: "transaction.account.balance", type: "int" },
  { name: "transaction.sender.last_name", type: "string" },
  { name: "transaction.has_3DS", type: "boolean" },
] as const;

export type Operator = {
  name: string;
  label: string;
  inputTypes: VariableType[];
  outputType: VariableType;
  category: OperatorCategory;
};

const operatorsData = [
  {
    name: "gt_eq",
    label: ">=",
    inputTypes: ["int"],
    outputType: "boolean",
    category: "Comparison",
  },

  {
    name: "neq",
    label: "!=",
    inputTypes: ["int", "string"],
    outputType: "boolean",
    category: "Comparison",
  },
  {
    name: "is_close_match",
    label: "is close match",
    inputTypes: ["string"],
    outputType: "boolean",
    category: "Comparison",
  },

  {
    name: "add",
    label: "+",
    inputTypes: ["int"],
    outputType: "int",
    category: "Arithmetic",
  },

  {
    name: "subtract",
    label: "-",
    inputTypes: ["int"],
    outputType: "int",
    category: "Arithmetic",
  },
  {
    name: "multiply",
    label: "*",
    inputTypes: ["int"],
    outputType: "int",
    category: "Arithmetic",
  },
  {
    name: "divide",
    label: "/",
    inputTypes: ["int"],
    outputType: "int",
    category: "Arithmetic",
  },
  {
    name: "AND",
    label: "AND",
    inputTypes: ["boolean"],
    outputType: "boolean",
    category: "Logical",
  },
  {
    name: "OR",
    label: "OR",
    inputTypes: ["boolean"],
    outputType: "boolean",
    category: "Logical",
  },
] as const;

export function getVariables(type: VariableType | null) {
  return variablesData.filter((variable) => !type || variable.type === type);
}

export function getVariableByName(name: string) {
  return variablesData.find((variable) => variable.name === name);
}

export function getOperators(type: VariableType | null) {
  return operatorsData.filter(
    (operator) =>
      !type || (operator.inputTypes as readonly VariableType[]).includes(type)
  );
}

export function getOperatorByName(name: string) {
  return operatorsData.find((operator) => operator.name === name);
}
