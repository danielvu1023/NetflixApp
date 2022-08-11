import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { default as authRouter } from "./routes/auth.js";
import { default as userRouter } from "./routes/users.js";
import { default as movieRouter } from "./routes/movies.js";
import { default as listRouter } from "./routes/lists.js";

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGO_DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);
app.use("/api/list", listRouter);

app.listen(8800, () => {
  console.log("Backend server is running");
});
