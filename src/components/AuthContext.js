import { createContext, useContext, useState } from "react";

const API_BASE = "https://apihandly.ddns.net";
const DEV_BYPASS_AUTH = false;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    DEV_BYPASS_AUTH ? { id: 1, username: "dev-user" } : null,
  );

  async function login(username, password) {
    if (DEV_BYPASS_AUTH) {
      setUser({ id: 1, username });
      return;
    }

    const response = await fetch(`${API_BASE}/api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Błąd logowania");
    }

    const data = await response.json();

    // Extract user data: handles { user: {id: 1...} } OR { id: 1... }
    const userData = data.user || data;

    // Ensure we have a numeric ID
    const finalUser = {
      ...userData,
      id: userData.id || userData.pk || data.id,
    };

    console.log("Zalogowano użytkownika:", finalUser);
    setUser(finalUser);
  }

  async function logout() {
    try {
      await fetch(`${API_BASE}/api/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout error", e);
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
