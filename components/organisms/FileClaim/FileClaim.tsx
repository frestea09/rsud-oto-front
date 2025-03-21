"use client";

import { Sidebar } from "@/components/molecules/Sidebar/Sidebar";
import { ClaimForm } from "../ClaimForm/ClaimForm";
import { Header } from "@/components/molecules/Header/Header";
import LogbookTable from "@/components/molecules/LogbookForm/LogbookForm";
import LogbookFormWeekly from "@/components/atoms/LogbookFormWeekly/LogbookFormWeekly";
import LogbookTableMobile from "@/components/atoms/LogbookTableMobile/LogbookTableMobile";

export default function FileClaim() {
  return (
    <div className="flex flex-col h-full w-full bg-gray-100 py-3 px-3">
      <Header />
      <LogbookFormWeekly />
      <LogbookTableMobile />
    </div>
  );
}
