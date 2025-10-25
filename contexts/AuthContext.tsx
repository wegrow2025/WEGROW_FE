import { createContext, useContext, useMemo, useState, useEffect } from "react";

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  childAge?: number;
  [key: string]: unknown;
}

interface AuthContextValue {
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 앱 시작 시 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있으면 사용자 정보를 가져오거나 기본값 설정
      setIsAuthenticated(true);
      // 필요시 토큰 유효성 검증 API 호출
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser: (user: AuthUser | null) => {
        setCurrentUser(user);
        setIsAuthenticated(!!user);
      },
      logout,
      isAuthenticated,
    }),
    [currentUser, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
