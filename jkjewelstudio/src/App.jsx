// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PublicRouter from "./router/PublicRouter";
import AdminRouter from "./router/AdminRouter";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>
        <Routes>
          {PublicRouter()}
          {AdminRouter()}
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
