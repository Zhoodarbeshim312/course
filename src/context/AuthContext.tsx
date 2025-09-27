import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { createContext, useContext, type FC, type ReactNode } from "react";
import { auth } from "../faerBase";

interface IAuthContext {
  register: (email: string, password: string, name: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  loginIn: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const register = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }
    return userCredential;
  };

  const loginIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    const providerGoogle = new GoogleAuthProvider();
    return signInWithPopup(auth, providerGoogle);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ register, signInWithGoogle, loginIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
