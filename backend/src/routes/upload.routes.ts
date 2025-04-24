import { Router } from "express";
import multer from "multer";
import {
  getUploadController,
  uploadPdfController,
} from "../controller/upload.controller";

export const uploadRouters: Router = Router();

const upload: multer.Multer = multer();

uploadRouters.post("", upload.single("pdf"), uploadPdfController);

uploadRouters.get("", getUploadController);
