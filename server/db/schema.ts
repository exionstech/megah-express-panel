import { json, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userRole = pgEnum("userRole", ["SUPERADMIN", "ADMIN", "USER"]);
export const kycStatus = pgEnum("kycStatus", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

type Docs = {
  aadharCard: string;
  panCard: string;
  voterCard?: string;
  passport?: string;
  photo: string;
  drivingLicence?: string;
};

export const users = pgTable("users", {
  id: text("id").primaryKey().unique().notNull(),
  clerkId: text("clerkId").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  mobile: text("mobile").unique(),
  avatar: text("avatar"),
  role: userRole("role").default("USER").notNull(),
  kycStatus: kycStatus("kycStatus").default("PENDING").notNull(),
  kycDocuments: json().$type<Docs>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
