import express from "express";
import tasks from "./routes/tasks.routes";
import register from "./routes/register.routes";
import login from "./routes/login.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use("/auth", register);
app.use("/auth", login);
app.use("/tasks", tasks)

export default app;
