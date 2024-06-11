"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { UpdateFormulaData } from "@/hooks/updateFormula";
import { MoreActionButton } from "../MoreActionButton";
import { FormulaScreen } from "../FormulaScreen";
import { useFormulaStore } from "@/providers/formulaStateProvider";

type FormulaViewProps = {
  name: string;
  value: number | null;
  state: string;
  update: (data: UpdateFormulaData) => void;
  deleteHandler: () => void;
};

export const FormulaView: FC<FormulaViewProps> = ({
  name,
  state,
  value,
  update,
  deleteHandler,
}) => {
  const updatedFormulaState = useFormulaStore((state) => state.updateRawState);
  const [nameValue, setNameValue] = useState<string>(name);
  const [isNameEditActive, setIsNameEditActive] = useState<boolean>(false);

  useEffect(() => updatedFormulaState(state), [state]);

  const nameContent = useMemo(
    () =>
      isNameEditActive ? (
        <input
          value={nameValue}
          autoFocus
          className={`w-full bg-transparent outline-none text-gray-900 text-xs  border-b-2`}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
          onBlur={() => {
            setIsNameEditActive(false);
            name !== nameValue && update({ name: nameValue });
          }}
        />
      ) : (
        <h4 className="text-xs" onClick={() => setIsNameEditActive(true)}>
          {nameValue}
        </h4>
      ),
    [isNameEditActive, nameValue, name]
  );

  return (
    <div className="flex flex-col overflow-hidden rounded border bg-white border-gray-300">
      <div className="flex h-8 items-center p-2 bg-gray-900 text-gray-900 justify-between bg-opacity-10">
        <div>{nameContent}</div>
        <MoreActionButton
          onDelete={deleteHandler}
          onRename={() => setIsNameEditActive(true)}
        />
      </div>
      <div className="flex h-8 items-center p-2 bg-gray-100 text-gray-900">
        {Object.is(value, null) && (
          <svg
            viewBox="0 0 32 32"
            className="mr-2 h-6 w-6 fill-current text-red-600"
          >
            <path
              fill-rule="evenodd"
              d="M4 16C4 9.373 9.373 4 16 4s12 5.373 12 12-5.373 12-12 12S4 22.627 4 16zm2 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10S6 21.523 6 16zm11-6v8h-2v-8h2zm0 10v2h-2v-2h2z"
            ></path>
          </svg>
        )}
        <p>{Object.is(value, null) ? "ERROR" : value}</p>
      </div>
      <div className="p-2 bg-white">
        <FormulaScreen updateHandler={update} />
      </div>
    </div>
  );
};
