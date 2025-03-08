"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import KycStatusSwitcher from "../../../_components/kyc-status-switcher";
import { toast } from "@pheralb/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiInstance from "@/lib/api";
import { useUser } from "@/hooks/use-user";


const useKycStatusMutation = (clerkId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      userId: string;
      kycStatus: "APPROVED" | "REJECTED";
    }) => {
      if (!clerkId) throw new Error("User not authenticated");
      const res = await ApiInstance(clerkId).post("/kyc/update", data);
      if (res.status !== 200)
        throw new Error("Failed to update KYC status");
      const json = res.data;
      if (!json.success)
        throw new Error(json.message || "Failed to update KYC status");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getverifiedusers"] });
      toast.success({
        text: "KYC status updated successfully",
      });
    },
    onError: (error: Error) => {
      toast.error({
        text: error.message || "Failed to update KYC status",
      });
    },
  });
};


const KycStatusCell = ({ userId, currentStatus }: { userId: string, currentStatus: string }) => {
  const { user } = useUser();
  const { mutate, isPending } = useKycStatusMutation(user?.clerkId);

  const handleStatusChange = (userId: string, newStatus: "APPROVED" | "REJECTED") => {
    mutate({ userId, kycStatus: newStatus });
  };

  if (currentStatus === "PENDING" || currentStatus === "APPLIED") {
    return (
      <div className="flex items-center gap-2">
        <svg
          width="8"
          height="8"
          fill="currentColor"
          viewBox="0 0 8 8"
          xmlns="http://www.w3.org/2000/svg"
          className={
            currentStatus === "PENDING"
              ? "text-yellow-500"
              : "text-orange-500"
          }
          aria-hidden="true"
        >
          <circle cx="4" cy="4" r="4" />
        </svg>
        <span>{currentStatus}</span>
      </div>
    );
  }

  return (
    <KycStatusSwitcher
      userId={userId}
      currentStatus={currentStatus}
      onStatusChange={handleStatusChange}
      isLoading={isPending}
    />
  );
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "avatar",
    header: "AVATAR",
    cell: ({ row }) => {
      return (
        <div className="min-w-[60px] flex items-center">
          {row.original.avatar && (
            <Avatar>
              <AvatarImage
                src={row.getValue("avatar")}
                alt={row.getValue("name")}
                className="object-contain"
              />
              <AvatarFallback>
                {row.original.name
                  ? row.original.name.slice(0, 2).toUpperCase()
                  : ""}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "USER ID",
    cell: ({ row }) => {
      return (
        <span className="flex items-center min-w-[100px]">
          {row.getValue("id")}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => {
      return (
        <div className="min-w-[120px] flex items-center">
          <span className="flex items-center">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => {
      return <span className="flex items-center">{row.getValue("email")}</span>;
    },
  },
  {
    accessorKey: "mobile",
    header: "MOBILE",
    cell: ({ row }) => {
      return (
        <span className="flex items-center">
          {row.original.mobile === null || row.original.mobile === undefined ? (
            <span className="italic">null</span>
          ) : (
            row.original.mobile
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "kycStatus",
    header: "KYC STATUS",
    cell: ({ row }) => (
      <KycStatusCell
        userId={row.original.id}
        currentStatus={row.original.kycStatus}
      />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "CREATED AT",
    cell: ({ row }) => {
      return (
        <span className="min-w-[200px] flex items-center">
          {format(new Date(row.original.createdAt), "PPP hh:mm a")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];