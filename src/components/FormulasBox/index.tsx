"use client";

import { FC } from "react";
import { AddButton } from "../AddButton";
import { FormulaView } from "../FormulaView";
import { useGetFormulas } from "@/hooks/useGetFormulas";
import { UpdateFormulaData, useUpdateFormula } from "@/hooks/updateFormula";
import { useDeleteFormula } from "@/hooks/useDeleteFormula";
import { useAddFormula } from "@/hooks/useAddFormula";
import { FormulaStateProvider } from "@/providers/formulaStateProvider";
import { Spinner } from "@/components/Spinner";

export const FormulasBox: FC = () => {
  const { data, isLoading } = useGetFormulas();
  const { mutate: updateFormula } = useUpdateFormula();
  const { mutate: deleteFormula } = useDeleteFormula();
  const { addDefaultFormula } = useAddFormula();

  return (
    <div className="flex flex-col border-r border-t border-solid grow">
      <div className="flex flex-row items-center px-6 py-4 gap-2">
        <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
          <path d="M3 1h13v2H5v12l-5-2v-2.3L3 12V1z"></path>
          <path d="M7 15h2.13l2.296-3.635h.056L13.686 15H16l-3.325-5.077L15.945 5h-2.13L11.61 8.48h-.055L9.406 5H7.092l3.27 4.942L7 15z"></path>
        </svg>
        <div className="flex-grow text-16">Formulas ({data?.length})</div>
        <AddButton onClick={addDefaultFormula} />
      </div>
      <div className="flex flex-col border-t border-solid p-6 gap-4">
        {isLoading ? (
          <Spinner />
        ) : (
          Array.isArray(data) &&
          data?.map(({ id, ...formulasFields }) => (
            <FormulaStateProvider key={id}>
              <FormulaView
                {...formulasFields}
                update={(data: UpdateFormulaData) =>
                  updateFormula({ id: id, data })
                }
                deleteHandler={() => deleteFormula({ id })}
              />
            </FormulaStateProvider>
          ))
        )}
      </div>
    </div>
  );
};
