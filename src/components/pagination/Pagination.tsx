import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
  page: number;
  handlePage: (type: "Next" | "Previous" | "First" | "Last") => void;
}

function Pagination({
  page,
  handlePage
}: PaginationProps) {
  return (
    <div className="flex justify-end mt-2 gap-2">
      <Button disabled={page === 0} onClick={() => handlePage("First")} variant="outline">
        <ChevronsLeftIcon />
      </Button>
      <Button disabled={page === 0} onClick={() => handlePage("Previous")} variant="outline">
        <ChevronLeftIcon />
      </Button>

      <Button onClick={() => handlePage("Next")} variant="outline">
        <ChevronRightIcon />
      </Button>
      <Button onClick={() => handlePage("Last")} variant="outline">
        <ChevronsRightIcon />
      </Button>
    </div>
  );
}

export default Pagination;
