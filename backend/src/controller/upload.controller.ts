import { Request, Response } from "express";
import {
  createUploadService,
  getUploadService,
} from "../services/upload.service";

export const uploadPdfController = async (
  request: Request,
  response: Response
): Promise<void> => {
  if (!request.file) {
    response.status(400).json({ message: "pdf not found." });
    return;
  }

  const data: string[] = await createUploadService(request.file!);

  response.status(201).json({ data });
};

export const getUploadController = async (
  _request: Request,
  response: Response
) => {
  const listAll = await getUploadService();

  response.json({ cpfs: listAll });
};
