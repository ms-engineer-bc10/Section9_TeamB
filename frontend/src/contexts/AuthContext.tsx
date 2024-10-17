"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: any;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  let timeout: NodeJS.Timeout;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const startTimeout = () => {
      timeout = setTimeout(logout, 15 * 60 * 1000); // 15分でタイムアウト
    };

    const resetTimeout = () => {
      clearTimeout(timeout);
      startTimeout();
    };

    window.onload = resetTimeout;
    window.onmousemove = resetTimeout;
    window.onkeydown = resetTimeout;

    return () => {
      clearTimeout(timeout);
      window.onload = null;
      window.onmousemove = null;
      window.onkeydown = null;
    };
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthはAuthProviderの内側で使用する必要があります");
  }
  return context;
};
