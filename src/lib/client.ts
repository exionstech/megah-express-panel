import { createClient } from "jstack";
import type { AppRouter } from "@/server";

export const client = createClient<AppRouter>({
  baseUrl: `${getBaseUrl()}/api`,
});

function getBaseUrl() {
  // 👇 Adjust for wherever you deploy
  if (process.env.NEXT_PUBLIC_CLIENT_SERVER_URL)
    return `${process.env.NEXT_PUBLIC_CLIENT_SERVER_URL}`;
  return `http://localhost:3000`;
}
