import { Button } from "@/components/ui/button";

export default function PaginationControls({
  currentPage,
  setCurrentPage,
  daysInMonth,
  daysPerPage,
}: any) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 p-4 bg-white rounded-xl">
      <Button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
        className="w-full md:w-auto px-6 py-3 rounded-full bg-white shadow-md text-gray-800 font-semibold hover:bg-gray-100 transition-all active:shadow-inner"
      >
        Sebelumnya
      </Button>

      <span className="text-gray-700 font-medium text-center md:text-left mt-4 md:mt-0">
        Minggu {currentPage + 1} ({currentPage * daysPerPage + 1} -{" "}
        {Math.min((currentPage + 1) * daysPerPage, daysInMonth)}) dari{" "}
        {daysInMonth} hari
      </span>

      <Button
        disabled={(currentPage + 1) * daysPerPage >= daysInMonth}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="w-full md:w-auto px-6 py-3 rounded-full bg-white shadow-md text-gray-800 font-semibold hover:bg-gray-100 transition-all active:shadow-inner mt-4 md:mt-0"
      >
        Selanjutnya
      </Button>
    </div>
  );
}
