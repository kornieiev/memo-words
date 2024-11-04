import { app } from "../../services/firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);

// AuthUserChecking:

// const authUserStatusChecking = async () => {
//   try {
//     const res = await onAuthStateChanged(auth, (user) => {
//       console.log("userAuthCheck", user);
//       // console.log("userAuthCheck", user.accessToken);

//       if (user) {
//         // if user authorized
//         console.log("User is signed in:", user);
//         // Now we can use user.uid or another data
//         return user.uid;
//       } else {
//         // if user is NOT authorized
//         console.log("No user is signed in");
//         return false;
//       }
//     });
//     console.log("res", res());
//     return res;
//   } catch (error) {
//     console.error("Ошибка при получении данных из Firestore:", error);
//     throw error; // чтобы вызвать ошибку и обработать её при вызове функции
//   }
// };

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

export { authUserStatusChecking, register, login, logout };
