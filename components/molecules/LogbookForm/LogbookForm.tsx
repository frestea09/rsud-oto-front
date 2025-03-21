"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

// Data Awal untuk Logbook
const initialData = [
  {
    id: 1,
    job: "Persiapan bahan makanan",
    indicator: "Penyiapan bahan makanan",
    hours: Array(31).fill(""),
  },
  {
    id: 2,
    job: "Distribusi hasil persiapan",
    indicator: "Distribusi hasil",
    hours: Array(31).fill(""),
  },
  {
    id: 3,
    job: "Menghitung kebutuhan bahan",
    indicator: "Perhitungan bahan",
    hours: Array(31).fill(""),
  },
];

export default function LogbookTable() {
  const { control, handleSubmit } = useForm();
  const [logData, setLogData] = useState(initialData);

  // Simpan Data
  const onSubmit = (data: any) => {
    console.log("Logbook Data:", logData);
    alert("Data logbook disimpan!");
  };

  // Fungsi untuk mengupdate jam kerja
  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const updatedData = [...logData];
    updatedData[rowIndex].hours[colIndex] = value;
    setLogData(updatedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Uraian Pekerjaan</TableHead>
            <TableHead className="text-center">Indikator Kinerja</TableHead>
            {Array.from({ length: 31 }, (_, i) => (
              <TableHead key={i} className="text-center">
                {i + 1}
              </TableHead>
            ))}
            <TableHead className="text-center">Jumlah</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logData.map((row, rowIndex) => (
            <TableRow key={row.id}>
              <TableCell className="text-center">{row.id}</TableCell>
              <TableCell>{row.job}</TableCell>
              <TableCell>{row.indicator}</TableCell>
              {row.hours.map((hour, colIndex) => (
                <TableCell key={colIndex} className="text-center">
                  <Controller
                    name={`logbook.${rowIndex}.${colIndex}`}
                    control={control}
                    defaultValue={hour}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        className="w-16 text-center"
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                      />
                    )}
                  />
                </TableCell>
              ))}
              <TableCell className="text-center font-bold">
                {row.hours.reduce((sum, val) => sum + (Number(val) || 0), 0)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button type="submit" className="mt-4 w-full bg-blue-600 text-white">
        Simpan Logbook
      </Button>
    </form>
  );
}
