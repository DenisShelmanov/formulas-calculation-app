import { FC } from "react";
import { Autocomplete } from "../Autocomplete";
import { useExpressionSearch } from "@/hooks/useExpressionSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { Formula, Variable } from "@prisma/client";
import { useFormulaStore } from "@/providers/formulaStateProvider";

type ExpressionAutocompleteProps = {
  onSelect: (option: Variable | Formula) => void;
};

export const ExpressionAutocomplete: FC<ExpressionAutocompleteProps> = ({
  onSelect,
}) => {
  const searchQuery = useFormulaStore((state) => state.searchQuery);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { data, isLoading } = useExpressionSearch(debouncedSearch);

  const options =
    Array.isArray(data) && data.length
      ? data.map((option) => (
          <div
            className="rounded cursor-pointer p-2 hover:bg-blue-400"
            onMouseDown={() => onSelect(option)}
            key={option.id}
          >
            {option.name}
          </div>
        ))
      : null;

  return options && searchQuery ? (
    <Autocomplete options={options} isLoading={isLoading} />
  ) : (
    <></>
  );
};
