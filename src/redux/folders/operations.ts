import { app, auth } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const getCurrentUserFolders = async () => {
  try {
    const userId = auth.currentUser?.uid;
    console.log("currentUserId:", userId);
    if (!userId) throw new Error("User is not authenticated");

    const foldersRef = collection(db, "folders");
    const q = query(foldersRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const folders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("currentUserFolders", folders);
    return folders;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    return [];
  }
};

export { getCurrentUserFolders };
