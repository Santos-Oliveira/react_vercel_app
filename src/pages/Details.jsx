import { useLocation,useNavigate } from 'react-router-dom'

export default function Details(){
  const { state } = useLocation()
  const nav=useNavigate()
  const book=state?.book
  if(!book) return <p>Livro não encontrado.</p>

  function fav(){
    const raw=localStorage.getItem('favBooks')
    const arr=raw?JSON.parse(raw):[]
    if(!arr.some(x=>x.number===book.number)) arr.push(book)
    localStorage.setItem('favBooks',JSON.stringify(arr))
    alert('Adicionado!')
  }

  return(
    <div style={{display:'flex',gap:'24px'}}>
      <img src={book.cover} style={{maxWidth:'320px'}}/>
      <div>
        <h2>{book.originalTitle}</h2>
        <p><b>Lançamento:</b> {book.releaseDate}</p>
        <p>{book.description}</p>
        <button className="button" onClick={()=>nav('/')}>Voltar</button>{" "}
        <button className="button" onClick={fav}>Favoritar</button>
      </div>
    </div>
  )
}
