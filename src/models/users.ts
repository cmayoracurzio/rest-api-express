import { db } from "../database";
import { users } from "../database/schema";
import { eq, sql } from "drizzle-orm";

// Type representing a user when queried from the database
export type User = typeof users.$inferSelect;

// Type representing a user when inserted into the database
export type NewUser = typeof users.$inferInsert;

/**
 * Fetches users from the database based on the provided filters.
 * @param filters - Optional filters to apply to the query.
 * @returns - Array of users matching the filters.
 */
export const getUsersFromDB = async (
  filters: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
): Promise<User[]> => {
  let query = db.select().from(users);

  // Append filters to the query based on provided filter values
  if (filters.userName) {
    query = query.where(eq(users.userName, filters.userName));
  }

  if (filters.firstName) {
    query = query.where(eq(users.firstName, filters.firstName));
  }

  if (filters.familyName) {
    query = query.where(eq(users.familyName, filters.familyName));
  }

  if (filters.address) {
    query = query.where(eq(users.address, filters.address));
  }

  return await query;
};

/**
 * Fetches a user by their ID.
 * @param userId - The ID of the user to fetch.
 * @returns - User matching the provided ID.
 */
export const getUserFromDB = async (userId: number): Promise<User[]> => {
  return await db.select().from(users).where(eq(users.id, userId));
};

/**
 * Inserts a new user into the database.
 * @param user - The user details to insert.
 * @returns - The inserted user.
 */
export const createUserInDB = async (user: NewUser): Promise<User[]> => {
  return await db.insert(users).values(user).returning();
};

/**
 * Updates a user's details in the database.
 * @param userId - The ID of the user to update.
 * @param fieldsToUpdate - The fields to update for the user.
 * @returns - The updated user.
 */
export const updateUserInDB = async (
  userId: number,
  fieldsToUpdate: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
): Promise<User[]> => {
  // Note: It's generally better if the database schema defines ON UPDATE triggers for the updatedAt column.
  return await db
    .update(users)
    .set({ ...fieldsToUpdate, updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(users.id, userId))
    .returning();
};

/**
 * Deletes a user from the database.
 * @param userId - The ID of the user to delete.
 * @returns - The deleted user.
 */
export const deleteUserFromDB = async (userId: number): Promise<User[]> => {
  return await db.delete(users).where(eq(users.id, userId)).returning();
};
