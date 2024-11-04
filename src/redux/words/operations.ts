import { app } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

/*
 * GET Data from Firestore
 */
const getAllDataFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "words"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных из Firestore:", error);
    throw error; // чтобы вызвать ошибку и обработать её при вызове функции
  }
};

export { getAllDataFromFirebase };
