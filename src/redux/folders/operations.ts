import { app, auth } from "../../services/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

/**
 * Возвращает список папок созданных авторизованным пользователем
 * @returns folders[]
 */
const getCurrentUserFolders = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("User is not authenticated");

    const foldersRef = collection(db, "folders");
    const q = query(foldersRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const folders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return folders;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return [];
  }
};

/**
 * Создает папку с именем и описанием, предварительно проверив, не было ли такой папки в БД создано ранее.
 * Папка создается только с привязкой к авторизованному пользователю
 * @param folderName
 * @param folderDescription
 * @returns docRef
 */
const createFolder = async (folderName: string, folderDescription: string) => {
  const userId = auth.currentUser?.uid;

  if (!userId) throw new Error("User is not authenticated");
  if (!folderDescription || !folderName) {
    throw new Error("Missing required fields");
  }

  try {
    // Проверка на существование папки с таким же именем для данного пользователя
    const foldersRef = collection(db, "folders");
    const q = query(
      foldersRef,
      where("userId", "==", userId),
      where("folderName", "==", folderName)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error("Folder with the same name already exists.");
    }

    // Если папки с таким же именем нет, создаем новую папку
    const docRef = await addDoc(foldersRef, {
      folderDescription,
      folderName,
      userId,
    });

    return docRef;
  } catch (error) {
    console.error("Error to crete new folder: ", error);
  }
};

/**
 * Удаляет папку по идентификатору, если она принадлежит авторизованному пользователю
 * @param folderId
 */
const deleteFolder = async (folderId: string) => {
  const userId = auth.currentUser?.uid;

  if (!userId) throw new Error("User is not authenticated");

  try {
    const folderRef = doc(db, "folders", folderId);

    // Получаем документ папки
    const folderDoc = await getDoc(folderRef);
    if (!folderDoc.exists()) {
      throw new Error("Folder not found");
    }

    // Проверка принадлежности папки текущему пользователю
    const folderData = folderDoc.data();
    if (folderData?.userId !== userId) {
      throw new Error("You do not have permission to delete this folder");
    }

    // Удаление папки
    await deleteDoc(folderRef);
    console.log("Folder deleted successfully");
  } catch (error) {
    console.error("Error deleting folder: ", error);
    throw error;
  }
};

export { getCurrentUserFolders, createFolder, deleteFolder };
