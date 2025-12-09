import { useEffect, useState } from 'react';

export default function Favorites() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('favBooks');
    setList(raw ? JSON.parse(raw) : []);
  }, []);

  function removeBook(id) {
    const confirmDelete = confirm("Tem certeza que deseja remover este livro dos favoritos?");
    if (!confirmDelete) return;

    const updated = list.filter(b => b.number !== id);
    setList(updated);
    localStorage.setItem('favBooks', JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // atualiza navbar
  }

  return (
    <div>
      <h2 style={{ marginBottom: "15px" }}>Favoritos</h2>

      {list.length === 0 ? (
        <p>Nenhum favorito salvo ainda.</p>
      ) : (
        <div className="grid">
          {list.map(book => (
            <div
              key={book.number}
              className="card"
              style={{ position: "relative" }}
            >
              {/* Coração fixo para indicar favorito */}
              <div
                className="heart pulse"
                style={{ position: "absolute", top: "12px", right: "14px" }}
                onClick={() => removeBook(book.number)}
              >
                ❤️
              </div>

              <img
                src={book.cover}
                alt={book.originalTitle}
                style={{ cursor: "pointer" }}
              />

              <h3>{book.originalTitle}</h3>

              <button
                className="button"
                style={{
                  background: "#ef4444",
                  marginTop: "10px",
                  width: "100%",
                  color: "#fff"
                }}
                onClick={() => removeBook(book.number)}
              >
                Remover dos Favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
