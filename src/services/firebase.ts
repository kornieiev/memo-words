// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

// AuthUserChecking:
const authUserStatusChecking = (): Promise<string | boolean> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // console.log("User is signed in:", user);
          const userId = auth.currentUser?.uid;
          // console.log("===>>> userId:", userId);

          resolve(user.uid); // возвращаем user.uid, если пользователь авторизован
        } else {
          // console.log("No user is signed in");
          resolve(false); // возвращаем false, если пользователь не авторизован
        }
      },
      (error) => {
        console.error("Ошибка при проверке статуса авторизации:", error);
        reject(error); // обрабатываем ошибку при проверке статуса
      }
    );
  });
};

// Registration:
const register = (email: string, password: string) => {
  const registerResult = createUserWithEmailAndPassword(auth, email, password);
  registerResult.then((resp) => console.log("register resp", resp));
  return registerResult;
};

// Login:
const login = (email: string, password: string) => {
  const loginResult = signInWithEmailAndPassword(auth, email, password);
  loginResult.then((resp) => console.log("login resp", resp.user));
  return loginResult;
};

// Logout:
const logout = () => {
  signOut(auth);
};

export { register, login, logout, authUserStatusChecking };
