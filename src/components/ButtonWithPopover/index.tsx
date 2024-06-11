"use client";

import { FC, ReactNode, useState } from "react";
import { Button, Popover, Label, TextInput } from "flowbite-react";

type ButtonWithPopoverProps = {
  children: ReactNode;
  popoverContent: ReactNode;
};

export const ButtonWithPopover: FC<ButtonWithPopoverProps> = ({
  children,
  popoverContent,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      aria-labelledby="area-popover"
      open={open}
      onOpenChange={setOpen}
      className="custom-popover z-10 drop-shadow-md"
      content={
        <div
          className="flex w-50 flex-col gap-4 p-2 text-sm text-gray-500 dark:text-gray-400 z-40"
          id="area-popover"
        >
          {popoverContent}
        </div>
      }
    >
      <button className="text-gray-500 w-6 h-6 p-1 rounded opacity-30 hover:opacity-100 hover:bg-gray-300">
        {children}
      </button>
    </Popover>
  );
};
