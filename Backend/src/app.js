import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import musicRoutes from "./routes/music.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/music", musicRoutes);

export default app;
