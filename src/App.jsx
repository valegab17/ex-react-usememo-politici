/* 📌 Milestone 2: Implementare la ricerca ottimizzata

    Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
    Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
    ❌ Non usare useEffect per aggiornare l’array filtrato.

Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia. */
import { useState, useEffect, memo, useMemo } from "react";

function App() {

  const API_URL = "http://localhost:3333";
  const [politicians, setPoliticians] = useState([]);
  const [research, setResearch] = useState('');
  useEffect(() => {
    //faccio partire la chiamata API 
    fetch(`${API_URL}/politicians`)
      .then(res => res.json())
      .then(data => {
        setPoliticians(data);
      }).catch(err => console.error("Errore nel caricamento dati", err));

  }, []);

const filteredPoliticians = useMemo(() => {
  return politicians.filter(p => 
    p.name.toLowerCase().includes(research.toLowerCase()) || 
    p.biography.toLowerCase().includes(research.toLowerCase())
  );
}, [politicians, research]);
  return (

    <>
      <div className="container">
        <h2>Lista dei politici</h2>
        <input 
        
        type="text"
        value={research}
        onChange={(e)=> setResearch(e.target.value)}
        placeholder="Cerca per nome e biografia"

        />
        <div className="lista-politici">
          {filteredPoliticians.map((p) => {
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
