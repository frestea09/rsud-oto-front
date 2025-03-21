"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Label } from "@/components/ui/label";

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export default function LogbookTable() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(month, year));
  const [logData, setLogData] = useState<{ [key: string]: string[] }>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const daysPerPage = 4;

  const uraianPekerjaan = [
    "Persiapan bahan makanan",
    "Memasak dan penyajian",
    "Pembersihan dapur",
    "Pengecekan stok bahan baku",
  ];

  const indikatorKinerja = [
    "Bahan makanan siap digunakan",
    "Makanan tersaji dengan baik",
    "Dapur bersih dan rapi",
    "Stok bahan sesuai kebutuhan",
  ];

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(month, year));
    const key = `${month}-${year}`;
    if (!logData[key]) {
      // Initialize logData for the selected month and year if it doesn't exist
      setLogData((prev) => ({
        ...prev,
        [key]: Array.from({ length: getDaysInMonth(month, year) }, () => ""),
      }));
    }
  }, [month, year]);

  const handleSave = () => {
    if (selectedDay !== null) {
      const key = `${month}-${year}`;
      // Make a copy of the current log data and update only the selected day
      const updatedData = [...logData[key]];
      updatedData[selectedDay - 1] = inputValue; // Update the specific day
      setLogData((prev) => ({ ...prev, [key]: updatedData })); // Save the updated data
      setSelectedDay(null); // Close the dialog
    }
  };

  return (
    <Card className="w-full max-w-screen-lg mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-4 md:p-6 my-6 hidden lg:flex md:flex">
      {/* Header */}
      <CardHeader className="grid grid-cols-1 md:flex md:flex-row md:justify-between md:items-center gap-4 bg-white rounded-xl p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 text-center md:text-left">
          Logbook Bulan
        </h2>

        <Select onValueChange={(value) => setMonth(Number(value))}>
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
      </CardHeader>

      <CardContent className="mt-4">
        {/* Tabel */}
        <ScrollArea className="w-full border rounded-lg p-4 bg-white overflow-x-auto">
          <table className="border w-full min-w-max text-sm md:text-base text-gray-700">
            <thead className="sticky top-0 bg-gray-200 text-gray-800 shadow-sm">
              <tr>
                <th className="px-2 md:px-4 py-2 text-center">No</th>
                <th className="px-2 md:px-4 py-2 text-left">
                  Uraian Pekerjaan
                </th>
                <th className="px-2 md:px-4 py-2 text-left">
                  Indikator Kinerja
                </th>
                {Array.from({ length: daysPerPage }, (_, i) => {
                  const day = currentPage * daysPerPage + i + 1;
                  return (
                    day <= daysInMonth && (
                      <th key={day} className="px-2 py-2 text-center border-b">
                        {`${day}/${month}`}
                      </th>
                    )
                  );
                })}
              </tr>
            </thead>
            <tbody className="overflow-x-scroll">
              {uraianPekerjaan.map((uraian, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="px-2 md:px-4 py-2 text-center font-semibold">
                    {index + 1}
                  </td>
                  <td className="px-2 md:px-4 py-2">{uraian}</td>
                  <td className="px-2 md:px-4 py-2">
                    {indikatorKinerja[index]}
                  </td>
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
                                className="border p-2 w-14 md:w-16 rounded-md bg-white shadow-md hover:bg-gray-200 transition-all"
                              >
                                {logData[`${month}-${year}`]?.[day - 1] ||
                                  "Input"}
                              </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Log</DialogTitle>
                                <DialogDescription>
                                  Update the log for this day.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label
                                    htmlFor="logInput"
                                    className="text-right"
                                  >
                                    Log
                                  </Label>
                                  <Input
                                    id="logInput"
                                    value={inputValue}
                                    onChange={(e) =>
                                      setInputValue(e.target.value)
                                    }
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={handleSave}>
                                  Save changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                      )
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>

        {/* Navigasi */}
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
      </CardContent>
    </Card>
  );
}
