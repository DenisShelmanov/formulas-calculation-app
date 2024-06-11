import { FC, ReactNode } from "react";
import { Spinner } from "@/components/Spinner";

type AutocompleteProps = {
  options: Array<ReactNode>;
  isLoading?: boolean;
};

export const Autocomplete: FC<AutocompleteProps> = ({
  options,
  isLoading = false,
}) => {
  return (
    <div
      id="dropdownDots"
      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 p-2"
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownMenuIconButton"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          options.map((item, index) => <li key={index}>{item}</li>)
        )}
      </ul>
    </div>
  );
};
