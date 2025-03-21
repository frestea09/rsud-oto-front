"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const steps = [
  { number: "01", label: "Preliminary", completed: true },
  { number: "02", label: "Your Details", completed: true },
  { number: "03", label: "KYC", completed: true },
  { number: "04", label: "Parties", completed: false, current: true },
  { number: "05", label: "Claim", completed: false },
  { number: "06", label: "Review", completed: false },
  { number: "07", label: "Payment", completed: false },
];

const StepBreadcrumb = () => (
  <Breadcrumb className="flex items-center space-x-4 text-sm text-gray-500">
    {steps.map((step, index) => (
      <BreadcrumbItem key={index}>
        <BreadcrumbLink href="#" className="flex items-center space-x-2">
          {step.completed ? (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-blue-500 w-5 h-5"
            />
          ) : step.current ? (
            <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          ) : (
            <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
          )}
          <span
            className={`font-semibold ${
              step.completed || step.current ? "text-black" : "text-gray-400"
            }`}
          >
            {step.number}
          </span>
          <span
            className={`text-sm ${
              step.completed || step.current ? "text-black" : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
        </BreadcrumbLink>
        {index < steps.length - 1 && (
          <div
            className={`w-12 h-1 ${
              step.completed
                ? "bg-blue-500"
                : step.current
                ? "border-dashed border-2 border-blue-500"
                : "bg-gray-300"
            }`}
          />
        )}
      </BreadcrumbItem>
    ))}
  </Breadcrumb>
);

export default StepBreadcrumb;
