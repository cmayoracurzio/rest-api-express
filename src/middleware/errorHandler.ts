import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  // Log the unexpected error for debugging
  console.error(error);

  return response.status(500).json({ error: "Internal server error" });
};
