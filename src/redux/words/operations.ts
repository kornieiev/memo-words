import { app, auth } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

/*
 * GET Data from Firestore
 */
const getAllDataFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "words"));
    const data = querySnapshot.docs.map((doc) => {
      console.log("doc - allData", doc);

      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных из Firestore:", error);
    throw error; // чтобы вызвать ошибку и обработать её при вызове функции
  }
};

const getCurrentUserWords = async () => {
  try {
    const userId = auth.currentUser?.uid;
    console.log("currentUserId:", userId);
    if (!userId) throw new Error("User is not authenticated");

    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const words = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("currentUserWords", words);
    return words;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return [];
  }
};

export { getAllDataFromFirebase, getCurrentUserWords };
