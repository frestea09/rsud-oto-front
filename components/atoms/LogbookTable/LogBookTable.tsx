"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dapatkan jumlah hari dalam bulan tertentu
const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export default function LogbookTable({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const daysInMonth = getDaysInMonth(month, year);
  const [logData, setLogData] = useState(
    Array.from({ length: daysInMonth }, () => "")
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  // Simpan perubahan jam kerja dan tutup modal
  const handleSave = () => {
    if (selectedDay !== null) {
      const updatedData = [...logData];
      updatedData[selectedDay - 1] = inputValue;
      setLogData(updatedData);
      setSelectedDay(null); // Tutup modal setelah menyimpan
    }
  };

  return (
    <div>
      <table className="border w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Uraian Pekerjaan</th>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <th key={i} className="text-center">{`${
                i + 1
              }/${month}/${year}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Persiapan bahan makanan</td>
            {logData.map((hour, dayIndex) => (
              <td key={dayIndex} className="text-center">
                <Dialog open={selectedDay === dayIndex + 1}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => {
                        setSelectedDay(dayIndex + 1);
                        setInputValue(hour);
                      }}
                      className="border p-2 w-16"
                    >
                      {hour || "✏️"}
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Masukkan Jam Kerja</DialogTitle>
                    </DialogHeader>
                    <Input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button onClick={handleSave}>Simpan</Button>
                  </DialogContent>
                </Dialog>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
