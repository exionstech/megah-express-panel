import { j } from "./jstack";

import { cors } from "hono/cors";
import { authRouter } from "./routers/auth-router";

const api = j
  .router()
  .get("/", async () => {
    return new Response(
      JSON.stringify({ message: "Welcome to Megha Express Server v1" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  })
  .basePath("/api")
  .use(
    cors({
      origin: "http://localhost:3000",
    })
  )
  .onError(j.defaults.errorHandler);

const appRouter = j.mergeRouters(api, {
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

export default appRouter;
