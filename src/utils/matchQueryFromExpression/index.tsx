export const matchQueryFromExpression = (
  rawString: string
): string | undefined => {
  const regExp = /[a-zA-Z]+$/;

  return rawString.match(regExp)?.at(0);
};
