import admin from "firebase-admin";
import { readFileSync } from "fs";

let serviceAccount;

if (process.env.NODE_ENV === "production") {
  const secretPath = "/etc/secrets/firebase-service-account.json";
  serviceAccount = JSON.parse(readFileSync(secretPath, "utf8"));
} else {
  serviceAccount = JSON.parse(
    readFileSync("./firebase-service-account.json", "utf8"),
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firebaseAdmin = admin;
