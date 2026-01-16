import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Home from "./pages/Home";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import Footer from "./components/Footer";
import AddOffer from "./components/AddOffer";
import OfferDetail from "./components/OfferDetail";
import OfferList from "./components/OfferList";
import "./App.css";

const DEV_BYPASS_AUTH = false;

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (DEV_BYPASS_AUTH) return children;

  return user ? children : <Navigate to="/" replace />;
}

function Layout({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const hideFooter =
    location.pathname === "/add" ||
    location.pathname.startsWith("/offer/") ||
    location.pathname === "/" ||
    location.pathname === "/logowanie" ||
    location.pathname === "/rejestracja";

  return (
    <>
      {children}
      {user && !hideFooter && <Footer />}
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

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <OfferList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddOffer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/offer/:id"
            element={
              <ProtectedRoute>
                <OfferDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
