import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("number");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // carregar favoritos
  useEffect(() => {
    const raw = localStorage.getItem("favBooks");
    setFavorites(raw ? JSON.parse(raw) : []);
  }, []);

  // carregar API dos livros
  useEffect(() => {
    setLoading(true);
    fetch('https://potterapi-fedeperin.vercel.app/en/books')
      .then(r => r.json())
      .then(data => {
        setBooks(data || []);
        setLoading(false);
      })
      .catch(() => {
        setBooks([]);
        setLoading(false);
      });
  }, []);

  function toggleFavorite(book) {
    const exists = favorites.some(f => f.number === book.number);

    const updated = exists
      ? favorites.filter(f => f.number !== book.number)
      : [...favorites, book];

    setFavorites(updated);
    localStorage.setItem("favBooks", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // atualiza a navbar
  }

  if (loading) return <p className="small">Carregando livros...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Catálogo Premium</h2>

      {/* BARRA DE BUSCA */}
      <input
        type="text"
        placeholder="Buscar livro..."
        className="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* SELECT DE ORDENAR */}
      <select
        className="sort"
        value={sort}
        onChange={e => setSort(e.target.value)}
      >
        <option value="number">Número do livro</option>
        <option value="title">Título (A-Z)</option>
        <option value="pages">Páginas</option>
      </select>

      {/* GRID DE LIVROS */}
      <div className="grid">
        {books
          .filter(b =>
            b.originalTitle.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => {
            if (sort === "number") return a.number - b.number;
            if (sort === "title") return a.originalTitle.localeCompare(b.originalTitle);
            if (sort === "pages") return a.pages - b.pages;
          })
          .map(b => {
            const isFav = favorites.some(f => f.number === b.number);

            return (
              <article key={b.number} className="card">

                {/* Coração posicionado fora da imagem */}
                <div
                  className={`heart ${isFav ? "pulse" : ""}`}
                  onClick={() => toggleFavorite(b)}
                  style={{ position: "absolute", top: "12px", right: "14px" }}
                >
                  {isFav ? "❤️" : "🤍"}
                </div>

                <img
                  src={b.cover}
                  alt={b.originalTitle}
                  onClick={() => navigate('/details', { state: { book: b } })}
                  style={{ cursor: "pointer" }}
                />

                <h3>{b.originalTitle}</h3>
              </article>
            );
          })}
      </div>
    </div>
  );
}