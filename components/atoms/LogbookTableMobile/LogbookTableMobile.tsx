"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export default function LogbookTableMobile() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(month, year));
  const [logData, setLogData] = useState<{ [key: string]: string[] }>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const daysPerPage = 2; // Dikurangi agar lebih nyaman di mobile

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(month, year));
    const key = `${month}-${year}`;
    if (!logData[key]) {
      setLogData((prev) => ({
        ...prev,
        [key]: Array.from({ length: getDaysInMonth(month, year) }, () => ""),
      }));
    }
  }, [month, year]);

  const handleSave = () => {
    if (selectedDay !== null) {
      const key = `${month}-${year}`;
      const updatedData = [...(logData[key] || [])];
      updatedData[selectedDay - 1] = inputValue;
      setLogData((prev) => ({ ...prev, [key]: updatedData }));
      setSelectedDay(null);
    }
  };

  return (
    <Card className="w-full lg:hidden md:hidden max-w-md mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6 my-6">
      {/* Header - Menyesuaikan dengan Mobile */}
      <CardHeader className="flex flex-col gap-4 bg-white rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 text-center">
          Logbook Bulan
        </h2>

        <Select onValueChange={(value) => setMonth(Number(value))}>
          <SelectTrigger className="w-full bg-white shadow-md rounded-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
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
      </CardHeader>

      <CardContent className="mt-4">
        {/* Tabel Mobile-Friendly */}
        <ScrollArea className="w-full border rounded-lg p-2 bg-white overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="sticky top-0 bg-gray-200 text-gray-800">
              <tr>
                <th className="px-2 py-2 text-center">No</th>
                <th className="px-2 py-2 text-left">Uraian</th>
                {Array.from({ length: daysPerPage }, (_, i) => {
                  const day = currentPage * daysPerPage + i + 1;
                  return (
                    day <= daysInMonth && (
                      <th key={day} className="px-2 py-2 text-center">
                        {`${day}/${month}`}
                      </th>
                    )
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-100">
                <td className="px-2 py-2 text-center font-semibold">1</td>
                <td className="px-2 py-2">Persiapan bahan makanan</td>
                {Array.from({ length: daysPerPage }, (_, i) => {
                  const day = currentPage * daysPerPage + i + 1;
                  return (
                    day <= daysInMonth && (
                      <td key={day} className="px-2 py-2 text-center">
                        <Dialog
                          open={selectedDay === day}
                          onOpenChange={(isOpen) =>
                            !isOpen && setSelectedDay(null)
                          }
                        >
                          <DialogTrigger asChild>
                            <button
                              onClick={() => {
                                setSelectedDay(day);
                                setInputValue(
                                  logData[`${month}-${year}`]?.[day - 1] || ""
                                );
                              }}
                              className="border p-2 w-full text-center rounded-md bg-gray-50 hover:bg-gray-200 transition-all"
                            >
                              {logData[`${month}-${year}`]?.[day - 1] || "✏️"}
                            </button>
                          </DialogTrigger>
                          <DialogContent className="rounded-lg p-4">
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
                              className="mt-4 w-full bg-blue-600 text-white"
                              onClick={handleSave}
                            >
                              Simpan
                            </Button>
                          </DialogContent>
                        </Dialog>
                      </td>
                    )
                  );
                })}
              </tr>
            </tbody>
          </table>
        </ScrollArea>

        {/* Navigasi Mobile */}
        <div className="flex flex-col gap-2 justify-between items-center mt-6 p-4 bg-white rounded-lg">
          <Button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            className="w-full px-4 py-3 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-all"
          >
            ⬅️ Sebelumnya
          </Button>

          <span className="text-gray-700 font-medium text-center">
            Minggu {currentPage + 1} ({currentPage * daysPerPage + 1} -{" "}
            {Math.min((currentPage + 1) * daysPerPage, daysInMonth)}) dari{" "}
            {daysInMonth} hari
          </span>

          <Button
            disabled={(currentPage + 1) * daysPerPage >= daysInMonth}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="w-full px-4 py-3 rounded-full bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-all"
          >
            Selanjutnya ➡️
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
