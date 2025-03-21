import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TableRow({
  index,
  selectedDay,
  setSelectedDay,
  inputValue,
  setInputValue,
  logData,
  month,
  year,
  handleSave,
}: any) {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-2 md:px-4 py-2 text-center font-semibold">
        {index + 1}
      </td>
      <td className="px-2 md:px-4 py-2">Persiapan bahan makanan</td>
      <td className="px-2 md:px-4 py-2">Terlaksananya persiapan bahan</td>
      <td className="px-2 md:px-4 py-2 text-center">
        <Dialog
          open={selectedDay === index + 1}
          onOpenChange={(isOpen) => !isOpen && setSelectedDay(null)}
        >
          <DialogTrigger asChild>
            <button
              onClick={() => {
                setSelectedDay(index + 1);
                setInputValue(logData[`${month}-${year}`]?.[index] || "");
              }}
              className="border p-2 w-14 md:w-16 rounded-md bg-white shadow-md hover:bg-gray-200 transition-all"
            >
              {logData[`${month}-${year}`]?.[index] || "Input"}
            </button>
          </DialogTrigger>
          <DialogContent className="rounded-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                Masukkan Jam Kerja
              </DialogTitle>
            </DialogHeader>
            <Input
              type="number"
              className="w-full border p-2 rounded-md"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              className="mt-4 w-full bg-gray-600 text-white"
              onClick={handleSave}
            >
              Simpan
            </Button>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
}
