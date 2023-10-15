import { Router } from "express";
import * as messageController from "../controllers/messageController";

const router = Router();

// Define message routes
router.get("/", messageController.getAllMessages);
router.get("/:id", messageController.getMessageById);
router.post("/", messageController.createMessage);
router.put("/:id", messageController.updateMessage);
router.delete("/:id", messageController.deleteMessage);

export default router;
