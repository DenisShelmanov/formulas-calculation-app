import { FC, useMemo, useState } from "react";
import { VariableType } from "@prisma/client";
import { UpdateVariableData } from "@/hooks/updateVariable";
import { MoreActionButton } from "../MoreActionButton";

type VariableViewProps = {
  name: string;
  type: VariableType;
  value: number;
  update: (data: UpdateVariableData) => void;
  deleteHandler: () => void;
};

export const VariableView: FC<VariableViewProps> = ({
  name,
  update,
  value,
  deleteHandler,
}) => {
  const [variableValue, setVariableValue] = useState<number>(value);
  const [nameValue, setNameValue] = useState<string>(name);
  const [isNameEditActive, setIsNameEditActive] = useState<boolean>(false);

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
      <div className="flex h-8 items-center p-2 bg-gray-100 text-gray-900 justify-between">
        <div>{nameContent}</div>
        <div>
          <MoreActionButton
            onDelete={deleteHandler}
            onRename={() => setIsNameEditActive(true)}
          />
        </div>
      </div>
      <div className="p-2 bg-white">
        <div className="rounded border border-solid p-1">
          <input
            className="w-full bg-transparent outline-none text-gray-900 text-xs"
            autoFocus
            value={variableValue}
            onChange={(e) => setVariableValue(Number(e.target.value))}
            onBlur={() =>
              value !== variableValue && update({ value: variableValue })
            }
          />
        </div>
      </div>
    </div>
  );
};
