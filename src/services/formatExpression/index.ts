import { getFormulasByIds } from "../getFormulas";
import { getVariablesByIds } from "../getVariables";

const extractUniqueIds = (input: string, regex: RegExp) => {
  const matches = [...input.matchAll(regex)];
  return [...new Set(matches.map((match) => match[1]))];
};

const replaceValues = (
  string: string,
  regex: RegExp,
  items: { id: string; value: number | string }[]
): string => {
  return string.replace(regex, (match, id) => {
    const item = items.find((item) => item.id === id);
    return item ? item.value.toString() : match;
  });
};

export const formatExpression = async (
  rawExpression: string
): Promise<string> => {
  const formulaRegex = /{{f:([^{}]+)}}/g;
  const formulaIds = extractUniqueIds(rawExpression, formulaRegex);

  if (!formulaIds.length) {
    return handleVariables(rawExpression);
  }

  const formulas = await getFormulasByIds(formulaIds);
  const formulasStates = formulas.map(({ id, state }) => ({
    id,
    value: state,
  }));

  const expressionWithFormulas = replaceValues(
    rawExpression,
    formulaRegex,
    formulasStates
  );

  return formatExpression(expressionWithFormulas);
};

const handleVariables = async (expression: string) => {
  const variableRegex = /{{v:([^{}]+)}}/g;
  const variableIds = extractUniqueIds(expression, variableRegex);
  const variables = await getVariablesByIds(variableIds);

  return replaceValues(expression, variableRegex, variables);
};
