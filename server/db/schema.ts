import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

// Enum Definitions
export const userRole = pgEnum("userRole", ["SUPERADMIN", "ADMIN", "USER"]);
export const kycStatus = pgEnum("kycStatus", [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "APPLIED",
]);

// KYC Documents Type
type KycDocuments = {
  aadharCard: string;
  panCard: string;
  voterCard?: string;
  passport?: string;
  photo: string;
  drivingLicence?: string;
};

// Users Table
export const users = pgTable("users", {
  id: text("id").primaryKey().unique().notNull(),
  clerkId: text("clerkId").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  mobile: text("mobile").unique(),
  avatar: text("avatar"),
  role: userRole("role").default("USER").notNull(),
  kycStatus: kycStatus("kycStatus").default("PENDING"),
  kycDocuments: text("kycDocuments").$type<KycDocuments>(),
  lastLogin: timestamp("lastLogin"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
