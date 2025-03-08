"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { formatedString } from "@/lib/utils";

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
        <span className="flex items-center">
          {(row.original.name)}
        </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => {
      return (
        <span className="flex items-center">
          {(row.getValue("email"))}
        </span>
      );
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
