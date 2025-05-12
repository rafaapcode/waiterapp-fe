import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
  existsOrder: boolean;
  totalPage: number;
  page: number;
  handlePage: (type: "Next" | "Previous" | "First" | "Last") => void;
}

function Pagination({
  totalPage,
  page,
  handlePage,
  existsOrder
}: PaginationProps) {
  return (
    <div className="flex justify-end mt-2 gap-2">
      <Button disabled={page === 1 || !existsOrder} onClick={() => handlePage("First")} variant="outline">
        <ChevronsLeftIcon />
      </Button>
      <Button disabled={page === 1 || !existsOrder} onClick={() => handlePage("Previous")} variant="outline">
        <ChevronLeftIcon />
      </Button>

      <Button disabled={page === totalPage || !existsOrder} onClick={() => handlePage("Next")} variant="outline">
        <ChevronRightIcon />
      </Button>
      <Button disabled={page === totalPage || !existsOrder} onClick={() => handlePage("Last")} variant="outline">
        <ChevronsRightIcon />
      </Button>
    </div>
  );
}

export default Pagination;
