import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firestore = getFirestore(app);

const storage = getStorage(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retrieveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function addData(collectionName: string, data: any) {
  try {
    const res = await addDoc(collection(firestore, collectionName), data);
    return res;
  } catch (error) {
    throw new Error("Failed to add document");
  }
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any
) {
  const docRef = doc(firestore, collectionName, id);
  try {
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteData(collectionName: string, id: string) {
  const docRef = doc(firestore, collectionName, id);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

export async function uploadFile(id: string, file: any, newName: string, collection: string, callback: Function) {
  if (file.size < 1048576) {
    const storageRef = ref(storage, `images/${collection}/${id}/${newName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          callback(true, downloadURL)
        });
      }
    );
  } else {
    return callback(false);
  }

  return true;
}
