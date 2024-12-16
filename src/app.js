import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
   origin: process.env.CORS_ORIGIN,
   credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.json());
app.use(express.static("public"));

// admin imports
import adminRouter from "./routes/admin.routes.js";

// admin routes
app.use("/api/v1/admin", adminRouter);
export { app };
