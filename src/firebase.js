import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
  doc,
  where,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const db = {
  folders: collection(firestore, "folders"),
  files: collection(firestore, "files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: serverTimestamp,
  addToCollection: addDoc,
  getDownloadURL: getDownloadURL,
};

export const documentFolder = (id) => {
  return doc(firestore, "folders", id);
};

export const documentFile = (id) => {
  return doc(firestore, "files", id);
};

export const uploadFile = (filePath, file) => {
  const fileRef = ref(storage, filePath);
  return uploadBytesResumable(fileRef, file);
};

export const addOrUpdateFile = async (fileName, userId, folderId, url) => {
  const userFilesQuery = query(
    db.files,
    where("name", "==", fileName),
    where("userId", "==", userId),
    where("folderId", "==", folderId)
  );

  const files = await getDocs(userFilesQuery);
  const file = files.docs[0];

  // if exists already
  if (file && file.exists()) {
    await updateDoc(file.ref, {
      updatedAt: db.getCurrentTimestamp(),
      url: url,
    });
    console.log(`Update success`);
  } else {
    await db.addToCollection(db.files, {
      createdAt: db.getCurrentTimestamp(),
      updatedAt: db.getCurrentTimestamp(),
      userId: userId,
      name: fileName?.trim(),
      url: url,
      folderId: folderId,
    });
    console.log(`Upload success`);
  }
};
