import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { DEV_BYPASS_AUTH } from "./config";
import Home from "./pages/Home";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import Zalogowany from "./pages/Zalogowany";
import Footer from "./components/Footer";
import AddOffer from "./pages/AddOffer";
import "./App.css";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (DEV_BYPASS_AUTH) return children;

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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logowanie" element={<Logowanie />} />
          <Route path="/rejestracja" element={<Rejestracja />} />
          <Route path="/add" element={<AddOffer />} />

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
    </AuthProvider>
  );
}
