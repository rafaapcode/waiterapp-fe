import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTable from "@/hooks/useTable";
import { Funnel } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";

interface DropdownDateFilterProps {
  date: DateRange | undefined;
  onSelectDates: (dates: DateRange | undefined) => void;
}

function DropdownDateFilter({ date, onSelectDates }: DropdownDateFilterProps) {
  const { table } = useTable();

  const column = table.getColumn('date');

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-gray-200 border border-gray-200 py-1 rounded-sm transition-all duration-200 w-fit flex items-center px-4 gap-2">
          <Funnel size={14} className="text-[#333333] font-semibold" />
          <p className="text-[#333333] font-semibold tracking-wide">Filtrar</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Calendar
            mode="range"
            selected={date}
            onSelect={onSelectDates}
            defaultMonth={new Date()}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DropdownDateFilter;
