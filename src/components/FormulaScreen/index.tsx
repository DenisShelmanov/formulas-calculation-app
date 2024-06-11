import { UpdateFormulaData } from "@/hooks/updateFormula";
import { parseFormula } from "@/utils/parseFormula";
import {
  FC,
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { ExpressionAutocomplete } from "../ExpressionAutocomlete";
import { v4 as uuidv4 } from "uuid";
import { useFormulaStore } from "@/providers/formulaStateProvider";
import { matchQueryFromExpression } from "@/utils/matchQueryFromExpression";
import { Formula, Variable } from "@prisma/client";

const handleFormulaRawContent = (children?: NodeListOf<ChildNode>) => {
  const content = Array.from(
    children as NodeListOf<HTMLDivElement | HTMLSpanElement>
  )
    .map((child) =>
      child.hasAttribute("title") ? child.title : child.textContent
    )
    .join("");

  return content;
};

type FormulaScreenProps = {
  updateHandler: (data: UpdateFormulaData) => void;
};

export const FormulaScreen: FC<FormulaScreenProps> = ({ updateHandler }) => {
  const [formulaState, updateFormulaState] = useFormulaStore(
    ({ rawState, updateRawState }) => [rawState, updateRawState]
  );
  const setSearchQuery = useFormulaStore((state) => state.setSearchQuery);
  const applyTargetOption = useFormulaStore((state) => state.applyTargetOption);

  const divRef = useRef<HTMLDivElement>(null);

  const inputHandler: FormEventHandler<HTMLDivElement> = useCallback((e) => {
    const content = e.currentTarget?.textContent || "";
    const match = matchQueryFromExpression(content);
    setSearchQuery(match || "");
  }, []);

  useEffect(() => {
    updateHandler({ state: formulaState });
    setSearchQuery("");
  }, [formulaState]);

  const onOptionSelect = (option: Variable | Formula) => {
    const children = divRef.current?.childNodes;
    const content = handleFormulaRawContent(children);
    applyTargetOption(option, content || formulaState);
  };

  const handleChangeContent = useCallback(() => {
    const children = divRef.current?.childNodes;
    const content = handleFormulaRawContent(children);
    content !== formulaState && updateFormulaState(content);
  }, [updateHandler, divRef.current]);

  const content = useMemo(
    () => (
      <div
        key={uuidv4()}
        className="flex flex-row w-full bg-transparent outline-none text-gray-900 text-xs min-h-4 flex-wrap gap-y-1 items-center"
        ref={divRef}
        content=""
        contentEditable
        onBlur={handleChangeContent}
        suppressContentEditableWarning
        onInput={inputHandler}
      >
        <span key={uuidv4()} className="h-4" />
        {parseFormula(formulaState)}
        <span key={uuidv4()} className="flex-grow h-4" />
      </div>
    ),
    [formulaState, inputHandler]
  );

  return (
    <>
      <div className="rounded border border-solid p-1">{content}</div>
      <ExpressionAutocomplete onSelect={onOptionSelect} />
    </>
  );
};
