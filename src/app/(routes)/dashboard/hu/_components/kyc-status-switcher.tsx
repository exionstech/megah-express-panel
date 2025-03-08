"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState, useId } from "react";
import { z } from "zod";

function StatusDot({ status }: { status: string }) {
  const colorMap = {
    PENDING: "text-yellow-500",
    APPLIED: "text-orange-500",
    APPROVED: "text-emerald-600",
    REJECTED: "text-red-500",
  };

  const color = colorMap[status as keyof typeof colorMap] || "text-gray-400";

  return (
    <svg
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      className={color}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

const kycStatusSchema = z.enum(["APPROVED", "REJECTED"]);

interface KycStatusSwitcherProps {
  userId: string;
  currentStatus: string;
  onStatusChange?: (userId: string, newStatus: "APPROVED" | "REJECTED") => void;
  isLoading?: boolean;
}

export default function KycStatusSwitcher({
  userId,
  currentStatus,
  onStatusChange,
  isLoading = false,
}: KycStatusSwitcherProps) {
  const id = useId();
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = (newStatus: string) => {
    try {
      const validatedStatus = kycStatusSchema.parse(newStatus);

      // Only update local state if not in loading state
      if (!isLoading) {
        setStatus(validatedStatus);

        if (onStatusChange) {
          onStatusChange(userId, validatedStatus);
        }
      }
    } catch (error) {
      console.error("Invalid status:", error);
    }
  };

  return (
    <div className="min-w-[135px]">
      <Select
        defaultValue={status}
        onValueChange={handleStatusChange}
        disabled={isLoading}
      >
        <SelectTrigger
          id={id}
          className={`h-8 w-full [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <SelectValue>
            <span className="flex items-center gap-2">
              {isLoading ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              ) : (
                <StatusDot status={status} />
              )}
              <span className="truncate">{status}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8">
          <SelectItem hideCheck value="APPROVED">
            <span className="flex items-center gap-2">
              <StatusDot status="APPROVED" />
              <span className="truncate">APPROVED</span>
            </span>
          </SelectItem>
          <SelectItem hideCheck value="REJECTED">
            <span className="flex items-center gap-2">
              <StatusDot status="REJECTED" />
              <span className="truncate">REJECTED</span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
