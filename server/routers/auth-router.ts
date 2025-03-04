import { currentUser } from "@clerk/nextjs/server";
import { dbProcedure, j } from "../jstack";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateUserID } from "@/lib/utils";

export const authRouter = j.router({
  getDatabaseSyncStatus: dbProcedure.query(async ({ c, ctx }) => {
    const auth = await currentUser();
    const { db } = ctx;
    if (!auth) {
      return c.json({ isSynced: false });
    }

    const userList = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, auth.id));

    if (userList.length === 0) {
      await db.insert(users).values({
        id: generateUserID(),
        clerkId: auth.id,
        email: auth.emailAddresses[0]?.emailAddress ?? "",
        name: auth.fullName ?? "",
        avatar: auth?.imageUrl,
        lastLogin: auth.lastSignInAt ? new Date(auth.lastSignInAt) : null,
      });

      return c.json({ isSynced: true });
    }
    return c.json({ isSynced: true });
  }),
  getUser: dbProcedure.query(async ({ c, ctx }) => {
    const auth = await currentUser();
    const { db } = ctx;

    if (!auth) {
      return c.json({
        success: false,
        user: null,
        message: "Unauthorized",
      });
    }

    const userList = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, auth.id));

    if (userList.length === 0) {
      return c.json({
        success: false,
        user: null,
        message: "User not found",
      });
    }

    return c.json({
      success: true,
      user: userList[0],
      message: "User Fetched",
    });
  }),
});
