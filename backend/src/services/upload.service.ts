import { db } from "../database/firebase";
import { extractCpfsFromPdf } from "../utils/pdf-parser";

const createUploadService = async (file: any) => {
  if (!file) {
    file.status(400).json({ message: "Pdf não enviado" });
    return;
  }

  const retrieveCpfs = await extractCpfsFromPdf(file.buffer);
  const ref = db.ref("cpfs");

  for (const cpfs of retrieveCpfs) {
    await ref.push(cpfs);
  }

  return retrieveCpfs;
};

const getUploadService = async () => {
  const ref = db.ref("cpfs");

  const snapshot = await ref.once("value");

  const data = snapshot.val();

  const listAll = Object.values(data || {});

  return listAll;
};

export { createUploadService, getUploadService };
