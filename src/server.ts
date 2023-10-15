import express from "express";
import userRoutes from "./routes/users";
import messageRoutes from "./routes/messages";
import { errorHandler } from "./middleware/errorHandler";

const PORT = 3000;
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Route groups
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
