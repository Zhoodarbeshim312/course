import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createContext, useContext, type FC, type ReactNode } from "react";
import { auth } from "../faerBase";

interface IAuthContext {
  register: (email: string, password: string, name: string) => Promise<any>;
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

  return (
    <AuthContext.Provider value={{ register }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
