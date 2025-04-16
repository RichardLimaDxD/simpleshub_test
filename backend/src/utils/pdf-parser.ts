import pdf from "pdf-parse";

const extractCpfsFromPdf = async (buffer: Buffer): Promise<string[]> => {
  const data = await pdf(buffer);

  const regex = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;

  const cpfs = data.text.match(regex) || [];

  return Array.from(new Set(cpfs));
};

export { extractCpfsFromPdf };
