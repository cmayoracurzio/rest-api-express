import express from "express";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";

const app = express();
const PORT = 3000;

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

// Start listening on a specific port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
