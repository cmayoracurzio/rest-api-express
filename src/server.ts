import express from "express";
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";

// Check for required environment variables

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error("PORT is not defined");
}

const app = express();

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
