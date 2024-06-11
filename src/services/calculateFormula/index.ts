import { formatExpression } from "../formatExpression";

export const calculateFormula = async (
  rawExpression: string
): Promise<number | null> => {
  try {
    const formattedExpression = await formatExpression(rawExpression);
    const postfix: (string | number)[] = shuntingYard(formattedExpression);

    if (!postfix.length) {
      throw new Error();
    }

    const result = evaluatePostfix(postfix);

    return result;
  } catch (error) {
    return null;
  }
};

const shuntingYard = (expr: string) => {
  if (/[a-zA-Z]/.test(expr)) {
    throw new Error("Invalid character in expression");
  }

  const outputQueue: (string | number)[] = [];
  const operatorStack: string[] = [];
  const operators: {
    [key: string]: {
      precedence: number;
      associativity: string;
      unary?: boolean;
    };
  } = {
    "+": { precedence: 2, associativity: "L" },
    "-": { precedence: 2, associativity: "L" },
    "*": { precedence: 3, associativity: "L" },
    "/": { precedence: 3, associativity: "L" },
    "(": { precedence: 1, associativity: "L" },
    ")": { precedence: 1, associativity: "L" },
    "u-": { precedence: 4, associativity: "R", unary: true }, // Unary minus
  };

  let lastToken: string | number | null = null;

  expr
    .split(/([+\-*/()])/)
    .filter((token) => token.trim())
    .forEach((token) => {
      const num = parseFloat(token);
      if (!isNaN(num)) {
        outputQueue.push(num);
        lastToken = num;
      } else if (operators[token]) {
        if (token === "(") {
          operatorStack.push(token);
          lastToken = token;
        } else if (token === ")") {
          while (
            operatorStack.length &&
            operatorStack[operatorStack.length - 1] !== "("
          ) {
            outputQueue.push(operatorStack.pop()!);
          }
          operatorStack.pop();
          lastToken = token;
        } else {
          if (
            token === "-" &&
            (lastToken === null ||
              operators[lastToken as string] ||
              lastToken === "(")
          ) {
            // Handle unary minus
            token = "u-";
          }

          while (
            operatorStack.length &&
            operators[operatorStack[operatorStack.length - 1]] &&
            ((operators[token].associativity === "L" &&
              operators[token].precedence <=
                operators[operatorStack[operatorStack.length - 1]]
                  .precedence) ||
              (operators[token].associativity === "R" &&
                operators[token].precedence <
                  operators[operatorStack[operatorStack.length - 1]]
                    .precedence))
          ) {
            outputQueue.push(operatorStack.pop()!);
          }
          operatorStack.push(token);
          lastToken = token;
        }
      }
    });

  while (operatorStack.length) {
    outputQueue.push(operatorStack.pop()!);
  }

  return outputQueue;
};

const evaluatePostfix = (postfix: (string | number)[]) => {
  const stack: number[] = [];

  postfix.forEach((token) => {
    if (typeof token === "number") {
      stack.push(token);
    } else if (token === "u-") {
      // Handle unary minus
      const a = stack.pop()!;
      stack.push(-a);
    } else {
      const b = stack.pop()!;
      const a = stack.pop()!;
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
      }
    }
  });

  return stack[0];
};
