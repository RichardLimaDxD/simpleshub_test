import { Application } from "express";
import express from "express";
import { uploadRouters } from "./routes/upload.routes";
import cors from "cors";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use("/upload", uploadRouters);

const PORT: number = parseInt(process.env.PORT!) || 3000;

app.listen(PORT, () => {
  console.log(`App is running on https://localhost:${PORT}`);
});
