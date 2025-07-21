import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Funnel } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";

interface DropdownDateFilterProps {
  date: DateRange | undefined;
  onSelectDates: (dates: DateRange | undefined) => void;
  handleResetData: () => void;
}

function DropdownDateFilter({
  date,
  onSelectDates,
  handleResetData,
}: DropdownDateFilterProps) {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="data-[state=open]:bg-gray-200 hover:bg-gray-200 border border-gray-200 py-1 rounded-sm transition-all duration-200 w-fit flex items-center px-4 gap-2">
          <Funnel size={14} className="text-[#333333] font-semibold" />
          <p className="text-[#333333] font-semibold tracking-wide">Filtrar</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Button
            disabled={ !!(!date?.from && !date?.to)}
            size={"sm"}
            variant={"secondary"}
            className="hover:bg-gray-200 my-2 ml-2 w-full max-w-[90%] tracking-wide text-[#333333] font-semibold disabled:hover:bg-transparent disabled:cursor-default"
            onClick={handleResetData}
          >
            Limpar Filtros
          </Button>
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
