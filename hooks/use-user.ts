import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
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

        return null;
      }
    },
    retry: 1,
  });

  return { user, isLoading, error };
};
