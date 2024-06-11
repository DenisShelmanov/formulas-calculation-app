import { FormulasBox } from "@/components/FormulasBox";
import { InputsBox } from "@/components/VariablesBox";
import { FC } from "react";

export const MainPage: FC = () => {
  return (
    <main className="flex h-screen flex-col items-stretch justify-between px-7 py-8">
      <div className="flex flex-row h-full">
        <InputsBox />
        <FormulasBox />
      </div>
    </main>
  );
};
