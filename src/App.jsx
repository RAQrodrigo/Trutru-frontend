import { useState } from "react";
import "./App.css";
import Boton from "./Boton.jsx";

// --- CONSTANTES (Fuera del componente para mayor claridad) ---
const IMAGENES_CARTAS = [
  "/images/1Basto.jpg",
  "/images/1Espada.jpg",
  "/images/7Espada.jpg",
];

const POSICION_MAZO = { x: window.innerWidth + 200, y: window.innerHeight / 2 };

const POSICIONES_INICIALES = [
  { x: -80, y: 20, rotate: -15 }, // Carta 1
  { x: 0, y: 0, rotate: 0 }, // Carta 2
  { x: 80, y: 20, rotate: 15 }, // Carta 3
];

function App() {
  // --- ESTADOS ---
  const [cards, setCards] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // --- LÓGICA DE JUEGO ---
  const repartirCartas = () => {
    if (cards.length > 0) return;

    const centroX = window.innerWidth / 2;
    // CAMBIO: Bajamos el porcentaje de 0.75 a 0.5 o 0.55 para que queden al centro
    const centroY = window.innerHeight * 0.67;

    const cartasNuevas = POSICIONES_INICIALES.map((pos) => ({
      id: crypto.randomUUID(),
      src: IMAGENES_CARTAS[Math.floor(Math.random() * IMAGENES_CARTAS.length)],
      position: { x: POSICION_MAZO.x, y: POSICION_MAZO.y },
      home: { x: centroX + pos.x, y: centroY + pos.y }, // Ahora aterrizan más arriba
      rotate: pos.rotate,
    }));

    setCards(cartasNuevas);

    setTimeout(() => {
      setCards((prev) =>
        prev.map((card) => ({
          ...card,
          position: card.home,
        }))
      );
    }, 50);
  };

  // --- MANEJADORES DE MOUSE ---
  const iniciarArrastre = (e, id) => {
    e.preventDefault();
    const card = cards.find((c) => c.id === id);
    setDraggingId(id);
    setOffset({
      x: e.clientX - card.position.x,
      y: e.clientY - card.position.y,
    });
  };

  const moverCarta = (e) => {
    if (!draggingId) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === draggingId
          ? {
              ...card,
              position: { x: e.clientX - offset.x, y: e.clientY - offset.y },
            }
          : card
      )
    );
  };

  const soltarCarta = () => {
    if (!draggingId) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === draggingId ? { ...card, position: card.home } : card
      )
    );
    setDraggingId(null);
  };

  return (
    <div className="container" onMouseMove={moverCarta} onMouseUp={soltarCarta}>
      <div className="top-interface">
        <h1>Truquiño</h1>
        <Boton texto="Aparecer cartas" alHacerClic={repartirCartas} />
      </div>

      {/* Renderizado de Cartas */}
      {cards.map((card) => (
        <img
          key={card.id}
          src={card.src}
          className="image"
          draggable={false}
          onMouseDown={(e) => iniciarArrastre(e, card.id)}
          style={{
            position: "fixed",
            left: `${card.position.x}px`,
            top: `${card.position.y}px`,
            transform:
              draggingId === card.id
                ? `translate(-50%, -50%) rotate(0deg) scale(1.1)`
                : `translate(-50%, -50%) rotate(${card.rotate}deg) scale(1)`,
            zIndex: draggingId === card.id ? 100 : 1,
            // Animación suave solo cuando NO se arrastra
            transition:
              draggingId === card.id
                ? "none"
                : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
            cursor: draggingId === card.id ? "grabbing" : "grab",
          }}
        />
      ))}

      <div className="bottom-interface">
        <Boton
          texto="Envido"
          claseExtra="btn-envido"
          alHacerClic={() => console.log("Envido")}
        />
        <Boton
          texto="Truco"
          claseExtra="btn-truco"
          alHacerClic={() => console.log("Truco")}
        />
        <Boton
          texto="Mazo"
          claseExtra="btn-mazo"
          alHacerClic={() => console.log("Mazo")}
        />
        <Boton
          texto="Quemar"
          claseExtra="btn-repartir"
          alHacerClic={repartirCartas}
        />
      </div>
    </div>
  );
}

export default App;
