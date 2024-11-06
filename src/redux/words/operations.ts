import { app, auth } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// import { WordProps } from "../../types/words";

const db = getFirestore(app);

/*
 * GET All Data from Firestore
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

/*
 * GET Current User All Words from Firestore
 */
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
    return words;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return [];
  }
};

interface WordProps {
  definition?: string;
  folder?: string;
  id?: string;
  imageLink?: string;
  learningStatus?: string;
  translation?: string;
  userId?: string;
  word?: string;
}

/*
 * GET Current User Words from specific folder
 */
const getDocumentsByUserAndId = async (folderName: string) => {
  try {
    const data = await getCurrentUserWords();
    const filteredData = data.filter(
      (word: WordProps) => word.folder === folderName
    );
    console.log("🚀 ~ filteredData:", filteredData);
    return filteredData as WordProps[];
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return [];
  }
};

export { getAllDataFromFirebase, getCurrentUserWords, getDocumentsByUserAndId };
