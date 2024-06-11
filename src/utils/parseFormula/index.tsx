import { InlineFormula } from "@/components/InlineFormula";
import { InlineVariable } from "@/components/InlineVariable";
import React, { FC, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

const componentMap: Record<"f" | "v", FC<any>> = {
  f: InlineFormula,
  v: InlineVariable,
};

type ComponentType = keyof typeof componentMap;

const parseHelper = (
  formula: string,
  parts: ReactNode[] = [],
  lastIndex: number = 0
): ReactNode[] => {
  const regex = /{{(f|v):([a-zA-Z0-9\-]+)}}/g;
  regex.lastIndex = lastIndex;
  const match = regex.exec(formula);

  if (match) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(
        <span id={uuidv4()}>{formula.substring(lastIndex, match.index)}</span>
      );
    }
    // Add the matched component
    const Component = componentMap[match[1] as ComponentType];
    const id = match[2];
    parts.push(<Component key={uuidv4()} id={id} />);
    // Recursively process the rest of the formula
    return parseHelper(formula, parts, regex.lastIndex);
  }

  // Add remaining text after the last match
  if (lastIndex < formula.length) {
    parts.push(<span id={uuidv4()}>{formula.substring(lastIndex)}</span>);
  }

  return parts;
};

export const parseFormula = (formula: string): ReactNode[] => {
  return parseHelper(formula);
};
