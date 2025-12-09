import About from "./pages/About";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Alternar tema (dark / light)
  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  // Atualizar contador de favoritos quando a página carregar
  useEffect(() => {
    function updateCounter() {
      const raw = localStorage.getItem("favBooks");
      const arr = raw ? JSON.parse(raw) : [];
      setFavoritesCount(arr.length);
    }

    updateCounter(); // atualiza ao carregar

    window.addEventListener("storage", updateCounter); // escuta mudanças

    return () => window.removeEventListener("storage", updateCounter);
  }, []); // <- importante: array vazio para não rodar infinito

  return (
    <BrowserRouter>
      <header className="header">
        <div className="container nav-wrapper">
          <h1 className="logo">React Books</h1>

          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/favorites">
              Favoritos <span className="badge">{favoritesCount}</span>
            </Link>
            <Link to="/about">Sobre</Link>
          </nav>

          {/* Botão de tema */}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
