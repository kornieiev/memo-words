import { app, auth } from "../../services/firebase";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// import { WordProps } from "../../types/words";

const db = getFirestore(app);

/**
 * * Возвращает массив всех words по всем folderName по всем пользователям
 * @returns
 */
// const getAllDataFromFirebase = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "words"));
//     const data = querySnapshot.docs.map((doc) => {
//       return {
//         id: doc.id,
//         ...doc.data(),
//       };
//     });
//     return data;
//   } catch (error) {
//     console.error("Ошибка при получении данных из Firestore:", error);
//     throw error; // чтобы вызвать ошибку и обработать её при вызове функции
//   }
// };

/**
 * * Возвращает массив всех words по всем folderName и авторизованному пользователю
 * @returns words[]
 */
const getCurrentUserWords = async () => {
  try {
    const userId = auth.currentUser?.uid;
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

/**
 * * Создает запрос по идентификатору folderName за данными на firebase с фильтрацией по авторизованному пользователю
 * * Возвращает массив words по искомой folderName и авторизованному пользователю
 * @param folderName
 * @returns filteredData[]
 */
const getDocumentsByUserAndId = async (folderName: string) => {
  try {
    const data = await getCurrentUserWords();
    const filteredData = data.filter(
      (word: WordProps) => word.folder === folderName
    );
    return filteredData as WordProps[];
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return [];
  }
};

/**
 * * Функция для создания новой записи в коллекции "words" с привязкой к авторизованному пользователю и проверкой не было ли данное word создано ранее
 * @param wordData
 */
const createWord = async (wordData: WordProps) => {
  console.log("!!wordData from operation createWord", wordData);
  const userId = auth.currentUser?.uid;

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  // Проверка на наличие обязательного поля "word"
  if (!wordData.word) {
    throw new Error("Missing required field 'word'");
  }

  try {
    // Проверка на наличие записи с таким же word для текущего пользователя
    const wordsRef = collection(db, "words");
    const q = query(
      wordsRef,
      where("userId", "==", userId),
      where("word", "==", wordData.word)
    );
    const existingWordsSnapshot = await getDocs(q);

    if (!existingWordsSnapshot.empty) {
      throw new Error(
        "A word with this name already exists for the current user"
      );
    }

    // Добавление новой записи
    const data = await addDoc(wordsRef, {
      ...wordData,
      userId,
    });
    if (data.id) {
      console.log("data.id", data.id);

      return { ...wordData, id: data.id };
    }
  } catch (error) {
    console.error("Error creating new word: ", error);
    throw error;
  }
};

export {
  getAllDataFromFirebase,
  getCurrentUserWords,
  getDocumentsByUserAndId,
  createWord,
};
