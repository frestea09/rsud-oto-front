"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LogbookTable from "@/components/atoms/LogbookTable/LogBookTable";
import LogbookTableMobile from "@/components/atoms/LogbookTableMobile/LogbookTableMobile";
import LogbookFormWeekly from "@/components/atoms/LogbookFormWeekly/LogbookFormWeekly";
import { Header } from "@/components/molecules/Header/Header";

export default function LogbookPage() {
  const [selectedWeek, setSelectedWeek] = useState(1);

  return (
    <div className="p-5">
      <Header />
      <LogbookFormWeekly />
    </div>
  );
}
