import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHPNIseWKNcBv7OJnfPqz_DQCMaWejSKQ",
  authDomain: "course-bc50c.firebaseapp.com",
  projectId: "course-bc50c",
  storageBucket: "course-bc50c.firebasestorage.app",
  messagingSenderId: "912563664946",
  appId: "1:912563664946:web:c7aefef75c69ebb7e8a42b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app