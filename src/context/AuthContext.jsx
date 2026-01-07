import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  login as authLogin,
  logout as authLogout,
  getCurrentUser,
  onAuthStateChange,
} from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true); // ✅ Initial load için true

  // Auth state'i güncelle
  const updateAuthState = useCallback((user) => {
    setAuthState({
      isAuthenticated: !!user,
      user: user
        ? {
            id: user.id,
            email: user.email,
            // Supabase user objesinden gelen diğer alanlar
            ...(user.user_metadata && { metadata: user.user_metadata }),
          }
        : null,
    });
  }, []);

  // Initial user check - Component mount olduğunda
  useEffect(() => {
    async function checkUser() {
      try {
        const user = await getCurrentUser();
        updateAuthState(user);
      } catch (error) {
        console.error("Error checking user:", error);
        updateAuthState(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkUser();
  }, [updateAuthState]);

  // Auth state change listener - Session değişikliklerini dinle
  useEffect(() => {
    const {
      data: { subscription },
    } = onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        const user = session?.user || (await getCurrentUser());
        updateAuthState(user);
      } else if (event === "SIGNED_OUT") {
        updateAuthState(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [updateAuthState]);

  // Login fonksiyonu
  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);
      try {
        const { user, session } = await authLogin(email, password);

        if (user && session) {
          updateAuthState(user);
          setIsLoading(false);
          return { success: true, user };
        } else {
          throw new Error("Giriş başarısız");
        }
      } catch (error) {
        setIsLoading(false);
        return {
          success: false,
          error: error.message || "Giriş yapılırken bir hata oluştu",
        };
      }
    },
    [updateAuthState]
  );

  // Logout fonksiyonu
  const logout = useCallback(async () => {
    try {
      await authLogout();
      updateAuthState(null);
    } catch (error) {
      console.error("Error logging out:", error);
      // Hata olsa bile local state'i temizle
      updateAuthState(null);
    }
  }, [updateAuthState]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
