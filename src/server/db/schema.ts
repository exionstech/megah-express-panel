import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRole = pgEnum("userRole", ["SUPERADMIN", "ADMIN", "USER"]);
export const kycStatus = pgEnum("kycStatus", [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "APPLIED",
]);

// KYC Documents Type
type KycDocuments = {
  aadharCardFront: string;
  aadharCardBack: string;
  panCardFront: string;
  panCardBack: string;
  voterCardFont?: string;
  voterCardBack?: string;
  passportFront?: string;
  passportBack?: string;
  drivingLicenceFront?: string;
  drivingLicenceBack?: string;
};

export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  clerkId: text("clerkId").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  mobile: text("mobile").unique(),
  avatar: text("avatar"),
  role: userRole("role").default("USER").notNull(),
  kycStatus: kycStatus("kycStatus").default("PENDING").notNull(),
  kycDocuments: text("kycDocuments").$type<KycDocuments>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
