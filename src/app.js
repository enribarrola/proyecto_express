import express from "express";
import morgan from "morgan";

const app = express();

// Import routes
import users from "../src/routes/user.routes.js";
//import taskRoutes from "./routes/tasks.routes.js";

// Middlewares
app.use(morgan("combined"));
app.use(express.json());

// Routes
app.use("/", users);
//app.use("/api/tasks", taskRoutes);

export default app;