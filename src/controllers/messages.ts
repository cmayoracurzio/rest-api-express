import { Request, Response, NextFunction } from "express";
import {
  getMessagesFromDB,
  createMessageinDB,
  updateMessageinDB,
  deleteMessageFromDB,
} from "../models/messages";
import CustomError from "../utils/customError";

/**
 * Handle request to retrieve all messages.
 * Filters can be optionally applied to narrow down the result set.
 */
export const getMessages = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Define valid filters for querying messages
    const validFilters = ["content", "userId"];
    const filters = request.query;

    // Validate filters against the defined valid filters
    for (const filter in filters) {
      if (!validFilters.includes(filter)) {
        throw new CustomError(`Invalid filter: ${filter}`, 400);
      }
    }

    // Retrieve messages based on applied filters
    const messages = await getMessagesFromDB(filters);

    return response.status(200).json({ data: messages });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to create a new message.
 */
export const createMessage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Extract message details from the request body
    const { userId, content } = request.body;

    // Validate necessary fields for message creation
    if (!userId || !content) {
      throw new CustomError("userName and password are required", 400);
    }

    // Persist the new message in the database
    const newMessage = await createMessageinDB({ userId, content });

    return response.status(201).json({ data: newMessage });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to update message content by its ID.
 */
export const updateMessage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Extract and validate the messageId from the request parameters
    const messageId = parseInt(request.params.id);

    if (isNaN(messageId)) {
      throw new CustomError("Invalid user ID", 400);
    }

    // Ensure only the content field is being updated
    for (const field in request.body) {
      if (field !== "content") {
        throw new CustomError(`Invalid field: ${field}`, 400);
      }
    }

    // Extract updated content from the request body
    const { content } = request.body;

    // Update the message content in the database
    const updatedMessage = await updateMessageinDB(messageId, content);

    response.status(200).json({ data: updatedMessage });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to delete a message by its ID.
 */
export const deleteMessage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Extract and validate the messageId from the request parameters
    const messageId = parseInt(request.params.id);

    if (isNaN(messageId)) {
      throw new CustomError("Invalid user ID", 400);
    }

    // Delete the message with the specified ID from the database
    const deletedMessage = await deleteMessageFromDB(messageId);

    response.status(200).json({ data: deletedMessage });
  } catch (error) {
    next(error);
  }
};
