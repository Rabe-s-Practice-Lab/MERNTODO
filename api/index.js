import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Db from "./config/db.js";
import authRoute from "./routes/auth.js";
import todoRoute from "./routes/todo.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 5001;

Db();

app.use("/auth", authRoute);
app.use("/todo", todoRoute);
app.listen(port, () => {
  console.log(`TODO server listening to port ${port}.`);
});
