/* 📌 Milestone 3: Ottimizzare il rendering delle card con React.memo

    Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
    Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
    Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate. */
import { useState, useEffect, memo, useMemo } from "react";
//mi creo una var in cui passare la prop politician
const CardPolitico = memo(({ politician }) => {
  console.log(`Render di: ${politician.name}`);
  return (
    <div>
      {/*  mostro il nome del politico */}
      <h3 className="nome-politico">{politician.name}</h3>
      {/* mostro l'img del politico */}
      <img src={politician.image} alt={politician.name} />
      <p className="posizione">{politician.position}</p>
      <p className="biografia">{politician.biography}</p>
    </div>

  )
})

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
          onChange={(e) => setResearch(e.target.value)}
          placeholder="Cerca per nome e biografia"

        />
        <div className="lista-politici">
          {filteredPoliticians.map((p) => {
            return (
              <CardPolitico key={p.id} politician={p} />
            )
          })}
        </div>

      </div>
    </>
  )
}

export default App
