import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  existsOrder: boolean;
  totalPage: number;
  page: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function Pagination({
  totalPage,
  page,
  setCurrentPage,
  existsOrder
}: PaginationProps) {

    const handlePage = (type: "Next" | "Previous" | "First" | "Last") => {
    switch (type) {
      case "First":
        setCurrentPage(1);
        break;
      case "Previous":
        setCurrentPage((prev) => (prev >= 0 && prev > 1 ? prev - 1 : 1));
        break;
      case "Next":
        setCurrentPage((prev) => prev + 1);
        break;
      case "Last":
        setCurrentPage(totalPage);
        break;
      default:
        setCurrentPage(1);
        break;
    }
  };

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
