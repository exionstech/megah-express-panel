import { client } from "@/lib/client";
import { toast } from "@pheralb/toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      try {
        const response = await client.auth.getUser.$get();
        const data = await response.json();
        if (data && data.user) {
          return data.user;
        }
        return null;
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error({
          text: "Something went wrong",
        });
        return null;
      }
    },
    retry: 1,
  });


  return { user, isLoading, error };
};
