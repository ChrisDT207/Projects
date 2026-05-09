import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "government";
  photosReported: number;
  points: number;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "user" | "government") => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: "user" | "government") => Promise<boolean>;
  logout: () => void;
  addPhotoReported: () => void;
  addPoints: (points: number) => void;
  redeemPoints: (amount: number) => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: "user" | "government") => {
    // Mock login - in production, this would call Supabase
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock user data
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      role,
      photosReported: 0,
      points: 0,
      joinDate: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return true;
  };

  const signup = async (email: string, password: string, name: string, role: "user" | "government") => {
    // Mock signup - in production, this would call Supabase
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      photosReported: 0,
      points: 0,
      joinDate: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addPhotoReported = () => {
    if (user) {
      const updatedUser = {
        ...user,
        photosReported: user.photosReported + 1,
        // Don't add points immediately - wait for government to complete
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const addPoints = (points: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        points: user.points + points,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const redeemPoints = (amount: number) => {
    if (user && user.points >= amount) {
      const updatedUser = {
        ...user,
        points: user.points - amount,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, addPhotoReported, addPoints, redeemPoints, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
