import { FC } from "react";
import { ButtonWithPopover } from "../ButtonWithPopover";

type MoreActionButtonProps = {
  onDelete: () => void;
  onRename: () => void;
};

export const MoreActionButton: FC<MoreActionButtonProps> = ({
  onRename,
  onDelete,
}) => {
  const popoverContent = (
    <div className="rounded bg-white p-2">
      <button
        onClick={onRename}
        className="group flex items-center p-2 rounded text-12 whitespace-nowrap hover:bg-gray-200 text-gray-900 w-full focus:outline-none"
      >
        <svg
          viewBox="0 0 16 16"
          className="w-4 h-4 text-gray-500 mr-2 group-hover:text-gray-900"
        >
          <path d="M9.167 2.897l2.187 2.188-5.833 5.833H3.333V8.731l5.834-5.834zm3.914-.361a.58.58 0 010 .822l-1.143 1.143L9.75 2.314l1.143-1.143a.58.58 0 01.823 0l1.365 1.365zM15 13H1v2h14v-2z"></path>
        </svg>
        <div>Rename</div>
      </button>
      <button
        onClick={onDelete}
        className="group flex items-center p-2 rounded text-12 whitespace-nowrap hover:bg-gray-200 text-gray-900 w-full focus:outline-none"
      >
        <svg
          viewBox="0 0 16 16"
          className="w-4 h-4 text-gray-500 mr-2 group-hover:text-gray-900"
        >
          <path d="M11 1h3v2H2V1h3l1-1h4l1 1zM5 16c-1.1 0-2-.9-2-2V4h10v10c0 1.1-.9 2-2 2H5z"></path>
        </svg>
        <div>Delete</div>
      </button>
    </div>
  );
  return (
    <ButtonWithPopover popoverContent={popoverContent}>
      <svg viewBox="0 0 16 16" className="icon-16">
        <path d="M4 8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm2 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm8 2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
      </svg>
    </ButtonWithPopover>
  );
};
