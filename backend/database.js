import admin from "firebase-admin";
import fs from "fs-extra";

let serviceAccount;
if (process.env.PRIVATE_KEY) {
  serviceAccount = JSON.parse(process.env.PRIVATE_KEY);
} else {
  try {
    serviceAccount = await fs.readJson("./servesacount.json");
  } catch (err) {
    console.log("error in reading json", err);
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function getDatabase() {
  return admin.firestore();
}

export default getDatabase;
