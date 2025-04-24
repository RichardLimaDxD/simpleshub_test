import PdfParse from "pdf-parse";
import { db, FirebasePaths } from "../database/firebase";
import { DataSnapshot, Reference } from "firebase-admin/database";

export const createUploadService = async (
  file: Express.Multer.File
): Promise<string[]> => {
  const extractCpfs = async (buffer: Buffer): Promise<string[]> => {
    const { text } = await PdfParse(buffer);

    const cpfRegex: RegExp = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;

    const matches: RegExpMatchArray | [] = text.match(cpfRegex) || [];

    return [...new Set(matches)];
  };

  const cpfs: string[] = await extractCpfs(file.buffer);

  const cpfsRef: Reference = db.ref(FirebasePaths.CPFS);

  for (const cpf of cpfs) {
    await cpfsRef.push(cpf);
  }

  return cpfs;
};

export const getUploadService = async () => {
  const ref: Reference = db.ref(FirebasePaths.CPFS);

  const snapshot: DataSnapshot = await ref.once("value");

  const data = snapshot.val();

  const listAll = Object.values(data || {});

  return listAll;
};
