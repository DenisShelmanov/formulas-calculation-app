import { FC, MouseEventHandler } from "react";

type AddButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const AddButton: FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      className="h-6 w-6 bg-blue-500 rounded hover:bg-blue-600"
      onClick={onClick}
    >
      <svg viewBox="0 0 16 16" className="fill-white">
        <path d="M13 9H9v4H7V9H3V7h4V3h2v4h4v2z"></path>
      </svg>
    </button>
  );
};
