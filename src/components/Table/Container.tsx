import { ReactNode } from "react";
import { Table } from "../ui/table";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="w-full mt-4 rounded-xl border bg-white overflow-y-auto max-h-full">
      <Table>{children}</Table>
    </div>
  );
}

export default Container;
