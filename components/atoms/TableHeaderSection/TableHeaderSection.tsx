import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TableHeaderSection({
  month,
  setMonth,
  year,
  submitLogbook,
}: any) {
  return (
    <div className="grid grid-cols-1 md:flex md:flex-row md:justify-between md:items-center gap-4 bg-white rounded-xl p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 text-center md:text-left">
        Logbook Bulan
      </h2>

      <Select
        onValueChange={(value) => setMonth(Number(value))}
        className="w-full md:w-auto"
      >
        <SelectTrigger className="w-full md:w-44 bg-white shadow-md rounded-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
          <SelectValue
            placeholder={`${new Date(0, month - 1).toLocaleString("default", {
              month: "long",
            })} ${year}`}
          />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-xl rounded-lg border border-gray-200">
          {[...Array(12)].map((_, i) => (
            <SelectItem
              key={i + 1}
              value={(i + 1).toString()}
              className="px-4 py-2 hover:bg-gray-100 transition-all rounded-md"
            >
              {new Date(0, i).toLocaleString("default", { month: "long" })}{" "}
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <button
        className="w-full md:w-44 px-4 py-2 rounded-full bg-white shadow-md text-gray-800 font-semibold active:shadow-inner hover:bg-gray-50 transition-all"
        onClick={submitLogbook}
      >
        Simpan Logbook
      </button>
    </div>
  );
}
