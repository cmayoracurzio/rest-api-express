import { Router } from "express";
import * as messageController from "../controllers/messages";

const router = Router();

// Define message routes
router.get("/", messageController.getMessages);
router.post("/", messageController.createMessage);
router.patch("/:id", messageController.updateMessage);
router.delete("/:id", messageController.deleteMessage);

export default router;
