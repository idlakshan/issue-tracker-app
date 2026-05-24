import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        icon={<ChevronLeft size={16} />}
      >
        Prev
      </Button>

      <Button
        variant="secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        icon={<ChevronRight size={16} />}
      >
        Next
      </Button>
    </div>
  );
}
