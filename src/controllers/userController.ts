import { Request, Response } from "express";
import { db } from "../database";
import { users } from "../database/schema";

export const getAllUsers = async (request: Request, response: Response) => {
  try {
    const result = await db.select().from(users);
    response.status(200).json({ data: result });
  } catch (err) {
    response.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (request: Request, response: Response) => {
  /* ... */
};
export const createUser = async (request: Request, response: Response) => {
  /* ... */
};
export const updateUser = async (request: Request, response: Response) => {
  /* ... */
};
export const deleteUser = async (request: Request, response: Response) => {
  /* ... */
};
