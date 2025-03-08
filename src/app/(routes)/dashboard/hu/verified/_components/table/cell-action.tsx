"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/use-user";
import ApiInstance from "@/lib/api";
import { toast } from "@pheralb/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DownloadCloud, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const queryClient = useQueryClient();


  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: async (id: string) => {
      if (!user) return;
      await ApiInstance(user.clerkId).post("/auth/delete", { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getverifiedusers"] });
      toast.success({
        text: "KYC Verified User deleted",
      });
      setOpen(false);
    },
  });

  const onConfirm = async () => {
    deleteUser(data.id);
  };
  if (!user) return null;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
        actionName="Delete"
        onLoadActionName="Deleting"
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={viewDocs}>
            <DownloadCloud className="mr-2 h-4 w-4" /> View Documents
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};