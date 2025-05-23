import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { MockUser, onAuthStateChange } from "@/lib/firebase";
import type { User as DbUser } from "@shared/schema";

interface AuthContextType {
  firebaseUser: MockUser | null;
  dbUser: DbUser | null;
  loading: boolean;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  dbUser: null,
  loading: true,
  refetchUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] = useState<MockUser | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDbUser = async (uid: string) => {
    try {
      const response = await fetch(`/api/users/firebase/${uid}`, {
        credentials: "include",
      });
      if (response.ok) {
        const user = await response.json();
        setDbUser(user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const refetchUser = () => {
    if (firebaseUser) {
      fetchDbUser(firebaseUser.uid);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setFirebaseUser(user);
      if (user) {
        await fetchDbUser(user.uid);
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, dbUser, loading, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}
