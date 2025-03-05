import { pgTable, text } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: text("id").primaryKey().unique().notNull(),
  clerkId: text("clerkId").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  avatar: text("avatar"),
});
