import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../src/components/AuthContext";

import Home from "./Home";
import Logowanie from "./Logowanie";
import Rejestracja from "./Rejestracja";
import Zalogowany from "./Zalogowany";
import Footer from "./Footer";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function Layout({ children }) {
  const { user } = useAuth();

  return (
    <>
      {children}
      {user && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logowanie" element={<Logowanie />} />
            <Route path="/rejestracja" element={<Rejestracja />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Zalogowany />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
