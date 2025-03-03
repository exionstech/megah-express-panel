import { drizzle } from "drizzle-orm/node-postgres";
import { jstack } from "jstack";
import * as schema from "./db/schema";
import { Pool } from "pg";
import { env } from "hono/adapter";

import { HTTPException } from "hono/http-exception";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

interface Env {
  Bindings: { DATABASE_URL: string; SECRET: string };
}

export const j = jstack.init<Env>();

const databaseMiddleware = j.middleware(async ({ c, next }) => {
  const { DATABASE_URL } = env(c);
  const { SECRET } = env(c);

  const pool = new Pool({
    connectionString: DATABASE_URL,
    max: 20,
  });
  const db = drizzle(pool, {
    schema,
  });

  return await next({ db, SECRET });
});

const authMiddleware = j.middleware(async ({ c, next }) => {
  const auth = await currentUser();
  const { DATABASE_URL } = env(c);

  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const pool = new Pool({
    connectionString: DATABASE_URL,
    max: 20,
  });
  const db = drizzle(pool, {
    schema,
  });

  const user = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.clerkId, auth?.id));

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return next({ user, db });
});

export const baseProcedure = j.procedure;
export const dbProcedure = j.procedure.use(databaseMiddleware);
export const privateProcedure = j.procedure.use(authMiddleware);
