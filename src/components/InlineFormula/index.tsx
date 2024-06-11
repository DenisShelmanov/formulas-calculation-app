import { useGetFormulaById } from "@/hooks/useGetFormulaById";
import { FC } from "react";

export const InlineFormula: FC<{ id: string }> = ({ id }) => {
  const { data, isSuccess } = useGetFormulaById(id);

  const name = isSuccess ? data?.name : "Unknown formula";

  return (
    <div
      title={`{{f:${id}}}`}
      key={id}
      className="m-x-1"
      contentEditable={false}
    >
      <span
        className="relative box-border whitespace-nowrap rounded border border-solid font-medium text-xs
            bg-gray-100 text-gray-900 border-gray-3003 px-1 py-0.5"
      >
        <span className="inline-block whitespace-pre">{name}</span>
      </span>
    </div>
  );
};
