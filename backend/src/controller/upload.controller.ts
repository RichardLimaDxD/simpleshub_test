import { Request, Response } from "express";
import {
  createUploadService,
  getUploadService,
} from "../services/upload.service";

const createUploadController = async (
  request: Request,
  response: Response
): Promise<void> => {
  const data = await createUploadService(request.file);

  response.status(201).json({ data });
};

const getUploadController = async (_request: Request, response: Response) => {
  const listAll = await getUploadService();

  response.json({ cpfs: listAll });
};

export { createUploadController, getUploadController };
