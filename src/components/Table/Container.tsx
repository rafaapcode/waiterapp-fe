import { ReactNode } from "react";
import { Table } from "../ui/table";

interface ContainerProps {
  children: ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <div className="w-full mt-4 rounded-xl border bg-white overflow-y-auto h-[600px]">
      <Table>{children}</Table>
    </div>
  );
}

export default Container;
