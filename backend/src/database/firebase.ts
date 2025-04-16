import { initializeApp, cert, Credential } from "firebase-admin/app";
import { Database, getDatabase } from "firebase-admin/database";
import * as dotenv from "dotenv";

dotenv.config();

const decodedKey: string = Buffer.from(
  process.env.FIREBASE_PRIVATE_KEY_BASE64!,
  "base64"
).toString("utf-8");

export const firebaseCert: Credential = cert({
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: decodedKey,
});

initializeApp({
  credential: firebaseCert,
  databaseURL: process.env.FIREBASE_DATABASE_URL!,
});

export const db: Database = getDatabase();
