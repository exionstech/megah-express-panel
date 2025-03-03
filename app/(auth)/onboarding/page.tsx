"use client";

import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@pheralb/toast";

const OnboardingPage = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryFn: async () => {
      const res = await client.auth.getDatabaseSyncStatus.$get();
      return await res.json();
    },
    queryKey: ["get-database-sync-status"],
    refetchInterval: (query) => {
      return query.state.data?.isSynced ? false : 1000;
    },
  });

  useEffect(() => {
    if (data?.isSynced) {
      toast.success({
        text: "Account created successfully",
        description: "verify kyc to create hubs ✨ ",
      });
      router.replace("/verify");
    }
  }, [data, router]);

  return (
    <div className="flex z-10 flex-col gap-4 w-full h-full min-h-screen items-center justify-center">
      <Loader className="w-10 h-10 text-black dark:text-white animate-spin" />
      <h1 className="text-2xl font-semibold">Fetching account details...</h1>
      <p className="text-base/7 text-gray-600 dark:text-muted-foreground max-w-prose">
        Just a moment while we set things up for you.
      </p>
    </div>
  );
};

export default OnboardingPage;
