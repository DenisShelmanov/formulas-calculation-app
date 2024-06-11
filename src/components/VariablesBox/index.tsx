"use client";

import { FC } from "react";
import { VariableView } from "../VariableView";
import { useGetVariables } from "@/hooks/useGetVariables";
import { UpdateVariableData, useUpdateVariable } from "@/hooks/updateVariable";
import { useDeleteVariable } from "@/hooks/useDeleteVariable";
import { v4 as uuidv4 } from "uuid";
import { AddButton } from "../AddButton";
import { useAddVariable } from "@/hooks/useAddVariable";
import { Spinner } from "@/components/Spinner";

export const InputsBox: FC = () => {
  const { data, isLoading } = useGetVariables();
  const { mutate: updateVariable } = useUpdateVariable();
  const { mutate: deleteVariable } = useDeleteVariable();
  const { addDefaultVariable } = useAddVariable();

  return (
    <div className="flex flex-col border-r border-t border-solid w-1/3">
      <div className="flex flex-row items-center px-6 py-4 gap-2">
        <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
          <path d="M12 8H9V0H7v8H4l4 4 4-4zm4 8v-4h-2v2H2v-2H0v4h16z"></path>
        </svg>
        <div className="flex-grow text-16">Inputs ({data?.length})</div>
        <AddButton onClick={() => addDefaultVariable()} />
      </div>
      <div className="flex flex-col border-t border-solid p-6 gap-4">
        {isLoading ? (
          <Spinner />
        ) : (
          Array.isArray(data) &&
          data?.map(({ id, ...variableFields }) => (
            <VariableView
              key={uuidv4()}
              {...variableFields}
              update={(data: UpdateVariableData) =>
                updateVariable({ id, data })
              }
              deleteHandler={() => deleteVariable({ id })}
            />
          ))
        )}
      </div>
    </div>
  );
};
