"use client";
import { DataTable as ProductTable } from "@/components/ui/table/data-table";
import { columns } from "./table/column";
import { useQuery } from "@tanstack/react-query";
import createApi from "@/lib/api";
import ApiInstance from "@/lib/api";

interface ProductListingPageProps {
  userClerkId: string;
  page: number;
  search?: string | null;
  pageLimit: number;
}

type ApiResponse = {
  success: boolean;
  data: {
    users: User[];
    offset: number;
    limit: number;
    count: number;
  };
  message: string;
};

export default function PendingUsersListingPage({
  userClerkId,
  page,
  search,
  pageLimit,
}: ProductListingPageProps) {
  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
  };

  const { data: response, isLoading } = useQuery<ApiResponse>({
    queryKey: ["getpendingusers", filters],
    queryFn: async () => {
      const response = await ApiInstance(userClerkId).get(
        "/user/getpendingusers",
        {
          params: filters,
        }
      );
      const data = response.data;
      return data;
    },
  });

  const users = response?.data?.users;

  const count = response?.data?.count;

  return (
    <ProductTable
      columns={columns}
      data={users ?? []}
      isLoading={isLoading}
      totalItems={count ?? 0}
    />
  );
}
