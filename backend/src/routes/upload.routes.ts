import { Router } from "express";
import multer from "multer";
import {
  createUploadController,
  getUploadController,
} from "../controller/upload.controller";

const uploadRouters: Router = Router();

const upload = multer();

uploadRouters.post("", upload.single("pdf"), createUploadController);

uploadRouters.get("", getUploadController);

export { uploadRouters };
