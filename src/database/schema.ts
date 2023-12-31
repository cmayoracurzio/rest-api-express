import { serial, text, timestamp, pgTable, integer } from "drizzle-orm/pg-core";

// Users table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  userName: text("user_name").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  familyName: text("family_name"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});

// Messages table schema
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at"),
});
