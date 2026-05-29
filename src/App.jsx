
import { useState, useEffect } from "react";

function App() {

  const API_URL = "http://localhost:3333";
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    //faccio partire la chiamata API 
    fetch(`${API_URL}/politicians`)
      .then(res => res.json())
      .then(data => {
        setPoliticians(data);
      }) .catch(err => console.error("Errore nel caricamento dati", err));

  }, []);
  return (
    
    <>
    <div className="container">
      <h2>Lista dei politici</h2>
      
       <div className="lista-politici">
        {politicians.map((p)=>{
          return (
            <div key={p.id} className="card">
              {/* mostro il nome del politico */}
              <h3 className="nome-politico">{p.name}</h3>
              {/* mostro l'img del politico */}
              <img src={p.image} alt={p.name} />
              <p className="posizione">{p.position}</p>
              <p className="biografia">{p.biography}</p>
            </div>
          )
        })}
       </div>
      
       </div>
    </>
  )
}

export default App
