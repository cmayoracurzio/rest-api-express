import { Request, Response, NextFunction } from "express";
import {
  getUsersFromDB,
  getUserFromDB,
  createUserInDB,
  updateUserInDB,
  deleteUserFromDB,
} from "../models/users";
import CustomError from "../utils/customError";

/**
 * Handle request to retrieve all users.
 * Filters can be optionally applied to narrow down the result set.
 */
export const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Define valid filters that can be used in the request
    const validFilters = ["userName", "firstName", "familyName", "address"];
    const filters = request.query;

    // Check for any invalid filter passed in the request
    for (const filter in filters) {
      if (!validFilters.includes(filter)) {
        throw new CustomError(`Invalid filter: ${filter}`, 400);
      }
    }

    // Fetch users from the database with the specified filters
    const users = await getUsersFromDB(filters);

    return response.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to retrieve a user by their ID.
 */
export const getUserById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Extract and validate the userId from the request parameters
    const userId = parseInt(request.params.id);

    if (isNaN(userId)) {
      throw new CustomError("Invalid user ID", 400);
    }

    // Fetch the user with the specified ID from the database
    const users = await getUserFromDB(userId);

    return response.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to create a new user.
 */
export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Destructure and validate required fields from the request body
    const { userName, password, firstName, familyName, address } = request.body;

    if (!userName || !password) {
      throw new CustomError("userName and password are required", 400);
    }

    // Insert the new user into the database
    const newUser = await createUserInDB({
      userName,
      password,
      firstName,
      familyName,
      address,
    });

    return response.status(201).json({ data: newUser });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to replace user details entirely by their ID.
 * This requires all fields to be provided in the request.
 */
export const replaceUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Extract and validate the userId from the request parameters
    const userId = parseInt(request.params.id);

    if (isNaN(userId)) {
      throw new CustomError("Invalid user ID", 400);
    }

    // Extract user details from the request body
    const { userName, password, firstName, familyName, address } = request.body;

    // Validate all user details for replacement
    if (
      !userName ||
      !password ||
      firstName === undefined ||
      familyName === undefined ||
      address === undefined
    ) {
      throw new CustomError(
        "All user fields (userName, password, firstName, familyName, and address) are required for a full update.",
        400
      );
    }

    // Update the user in the database with new details
    const updatedUser = await updateUserInDB(userId, {
      userName,
      password,
      firstName,
      familyName,
      address,
    });

    return response.status(200).json({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to partially update user details by their ID.
 * Only the fields provided in the request body will be updated.
 */
export const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Extract and validate the userId from the request parameters
    const userId = parseInt(request.params.id);

    if (isNaN(userId)) {
      throw new CustomError("Invalid user ID", 400);
    }

    // Define valid fields that can be updated and prepare fields for updating
    const validFields = [
      "userName",
      "password",
      "firstName",
      "familyName",
      "address",
    ];
    const fieldsToUpdate: Partial<typeof request.body> = {};

    // Iterate over request body to filter out valid fields for updating
    for (const field in request.body) {
      if (validFields.includes(field)) {
        fieldsToUpdate[field] = request.body[field];
      } else {
        throw new CustomError(`Invalid field: ${field}`, 400);
      }
    }

    // Update the user in the database with new details
    const updatedUser = await updateUserInDB(userId, fieldsToUpdate);

    response.status(200).json({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

/**
 * Handle request to delete a user by their ID.
 */
export const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    // Extract and validate the userId from the request parameters
    const userId = parseInt(request.params.id);

    if (isNaN(userId)) {
      throw new CustomError("Invalid user ID", 400);
    }

    // Remove the user with the specified ID from the database
    const deletedUser = await deleteUserFromDB(userId);

    response.status(200).json({ data: deletedUser });
  } catch (error) {
    next(error);
  }
};
