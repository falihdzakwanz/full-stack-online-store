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

const firestore = getFirestore(app);

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
  await addDoc(collection(firestore, collectionName), data);
}

export async function updateData(collectionName: string, id: string, data: any) {
  const docRef = doc(firestore, collectionName, id);
  try {
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteData(collectionName: string, id: string){
  const docRef = doc(firestore, collectionName, id);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

