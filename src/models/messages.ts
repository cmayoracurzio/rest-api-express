import { db } from "../database";
import { messages } from "../database/schema";
import { eq, ilike, sql } from "drizzle-orm";

// Type representing a message when queried from the database
export type Message = typeof messages.$inferSelect;

// Type representing a message when inserted into the database
export type NewMessage = typeof messages.$inferInsert;

/**
 * Fetches messages from the database based on the provided filters.
 * @param filters - Optional filters to apply to the query.
 * @returns - Array of messages matching the filters.
 */
export const getMessagesFromDB = async (
  filters: Partial<Omit<Message, "id" | "createdAt" | "updatedAt">>
): Promise<Message[]> => {
  let query = db.select().from(messages);

  // Append filters to the query based on provided filter values
  if (filters.content) {
    query = query.where(ilike(messages.content, `%${filters.content}%`));
  }

  if (filters.userId) {
    query = query.where(eq(messages.userId, filters.userId));
  }

  return await query;
};

/**
 * Inserts a new message into the database.
 * @param newMessage - The message details to insert.
 * @returns - The inserted message.
 */
export const createMessageinDB = async (
  newMessage: NewMessage
): Promise<Message[]> => {
  return await db.insert(messages).values(newMessage).returning();
};

/**
 * Updates the content of a specific message by its ID in the database.
 * @param messageId - The ID of the message to update.
 * @param content - The content to update for the message.
 * @returns - The updated message.
 */
export const updateMessageinDB = async (
  messageId: number,
  content: string
): Promise<Message[]> => {
  // Note: It's generally better if the database schema defines ON UPDATE triggers for the updatedAt column.
  return await db
    .update(messages)
    .set({ content, updatedAt: sql`CURRENT_TIMESTAMP` })
    .where(eq(messages.id, messageId))
    .returning();
};

/**
 * Deletes a specific message by its ID from the database.
 * @param messageId - The ID of the message to delete.
 * @returns - The deleted message.
 */
export const deleteMessageFromDB = async (
  messageId: number
): Promise<Message[]> => {
  return await db
    .delete(messages)
    .where(eq(messages.id, messageId))
    .returning();
};
