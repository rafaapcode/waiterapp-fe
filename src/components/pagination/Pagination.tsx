import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
  toNextPage: () => void;
  toPreviousPage: () => void;
  toFirstPage: () => void;
  toLastPage: () => void;
}

function Pagination({
  toFirstPage,
  toLastPage,
  toNextPage,
  toPreviousPage,
}: PaginationProps) {
  return (
    <div className="flex justify-end mt-2 gap-2">
      <Button onClick={toFirstPage} variant="outline">
        <ChevronsLeftIcon />
      </Button>
      <Button onClick={toPreviousPage} variant="outline">
        <ChevronLeftIcon />
      </Button>

      <Button onClick={toNextPage} variant="outline">
        <ChevronRightIcon />
      </Button>
      <Button onClick={toLastPage} variant="outline">
        <ChevronsRightIcon />
      </Button>
    </div>
  );
}

export default Pagination;
