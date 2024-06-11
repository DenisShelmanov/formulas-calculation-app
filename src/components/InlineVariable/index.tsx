import { useUpdateVariable } from "@/hooks/updateVariable";
import { useGetVariableById } from "@/hooks/useGetVariableById";
import { FC, FocusEventHandler, useEffect, useState } from "react";

export const InlineVariable: FC<{ id: string }> = ({ id }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [variableValue, setVariableValue] = useState<number>();
  const { data, isSuccess } = useGetVariableById(id);
  const { mutate } = useUpdateVariable();

  const name = isSuccess ? data?.name : "Unknown variable";
  const updateVariable: FocusEventHandler<HTMLInputElement> = (e) => {
    variableValue !== data?.value &&
      mutate({ id, data: { value: variableValue } });
    setIsEditable(false);
  };

  useEffect(() => {
    setVariableValue(data?.value);
  }, [data]);

  return (
    <div
      title={`{{v:${id}}}`}
      contentEditable={false}
      key={id}
      onBlur={() => setIsEditable(false)}
    >
      <span
        className="flex flex-row gap-2 box-border whitespace-nowrap rounded border border-solid font-medium text-xs
            bg-gray-100 text-gray-900 border-gray-3003 px-1 py-0.5"
      >
        <span className="inline-block">{name}</span>

        {isEditable ? (
          <input
            className="ml-4 h-4 w-16 rounded border outline-none border-gray-300"
            value={variableValue}
            onBlur={updateVariable}
            onInput={({ currentTarget }) =>
              setVariableValue(Number(currentTarget.value))
            }
          />
        ) : (
          <span
            className="cursor-pointer opacity-60 hover:opacity-100 flex gap-1"
            onClick={() => setIsEditable(true)}
          >
            <span className="inline-block w-px bg-gray-600" />
            {data?.value}
          </span>
        )}
      </span>
    </div>
  );
};
