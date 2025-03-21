"use client";

import { Progress } from "@/components/ui/progress";

export const Header = () => (
  <div className="flex flex-col py-4 px-4 md:px-8 bg-white rounded-xl ">
    {/* Desktop View */}
    <div className="hidden md:flex justify-between items-center space-x-4 text-gray-700 font-medium py-3">
      {["Preliminary", "Your Details", "KYC", "Parties"].map((step, index) => (
        <div
          key={index}
          className="flex flex-col items-center px-6 py-2 rounded-xl shadow-[4px_4px_8px_#e0e0e0,-4px_-4px_8px_#ffffff] transition-all hover:scale-105 hover:shadow-[6px_6px_12px_#e0e0e0,-6px_-6px_12px_#ffffff]"
        >
          <span className="text-lg font-semibold text-gray-800">{`0${
            index + 1
          }`}</span>
          <span className="text-sm text-gray-500">{step}</span>
        </div>
      ))}
    </div>

    {/* Mobile View */}
    <div className="md:hidden flex flex-col items-center">
      <div className="flex space-x-3">
        {["Preliminary", "Your Details", "KYC", "Parties"].map(
          (step, index) => (
            <div
              key={index}
              className="flex flex-col items-center px-3 py-2 rounded-xl shadow-[4px_4px_8px_#e0e0e0,-4px_-4px_8px_#ffffff] transition-all hover:scale-105"
            >
              <span className="text-md font-semibold text-gray-800">{`0${
                index + 1
              }`}</span>
              <span className="text-xs text-gray-500">{step}</span>
            </div>
          )
        )}
      </div>
    </div>

    {/* Progress Bar */}
    <div className="w-full mt-6 bg-white rounded-full shadow-[inset_4px_4px_8px_#e0e0e0,inset_-4px_-4px_8px_#ffffff]">
      <Progress
        value={25}
        className="h-2 rounded-full bg-transparent [&>div]:bg-gray-500 [&>div]:rounded-full shadow-[inset_3px_3px_6px_#e0e0e0,inset_-3px_-3px_6px_#ffffff]"
      />
    </div>
  </div>
);
