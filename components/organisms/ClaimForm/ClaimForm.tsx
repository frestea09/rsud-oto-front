import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@radix-ui/react-progress";
import { Upload } from "lucide-react";
import { useState } from "react";

export const ClaimForm = () => {
  const [progress, setProgress] = useState(50);
  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        File your Claim.{" "}
        <span className="text-gray-500">(Approx 5 Minutes)</span>
      </h2>
      <Progress value={progress} className="mb-4" />
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label className="font-semibold text-gray-700">Claim Value</label>
          <Input type="text" placeholder="10,000 USD" className="mt-2" />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Place</label>
          <Input
            type="text"
            placeholder="Select the Place for proceedings"
            className="mt-2"
          />
        </div>
        <div>
          <label className="font-semibold text-gray-700">Language</label>
          <Input
            type="text"
            placeholder="Select the language for proceedings"
            className="mt-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <Upload className="w-8 h-8 text-blue-500 mx-auto" />
          <p className="text-gray-500 mt-2">Write your Statement Here</p>
          <Button className="mt-4">Upload a PDF</Button>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <Upload className="w-8 h-8 text-blue-500 mx-auto" />
          <p className="text-gray-500 mt-2">Upload the Contract</p>
          <Button className="mt-4">Upload a PDF</Button>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <Upload className="w-8 h-8 text-blue-500 mx-auto" />
          <p className="text-gray-500 mt-2">Additional Documentation</p>
          <Button className="mt-4">Upload a PDF</Button>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button className="bg-blue-600 text-white px-6 py-2 rounded-md">
          Next Step
        </Button>
      </div>
    </div>
  );
};
