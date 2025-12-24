import { useState } from "react";
import "./App.css";
import Boton from "./Boton.jsx";

function App() {
  const images = [
    "/images/1Basto.jpg",
    "/images/1Espada.jpg",
    "/images/7Espada.jpg",
    "/images/7Oro.jpg",
  ];

  const [cards, setCards] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const homePositions = [
    { x: 500, y: 450 },
    { x: 650, y: 450 },
    { x: 800, y: 450 },
  ];

  const randomImage = () => {
    if (cards.length >= 3) return;

    const index = Math.floor(Math.random() * images.length);
    const position = homePositions[cards.length];

    const newCard = {
      id: Date.now(),
      src: images[index],
      position: position,
      home: position,
    };

    setCards([...cards, newCard]);
  };

  const handleMouseDown = (e, id) => {
    e.preventDefault();
    const card = cards.find((c) => c.id === id);

    setDraggingId(id);
    setOffset({
      x: e.clientX - card.position.x,
      y: e.clientY - card.position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingId) return;

    setCards((cards) =>
      cards.map((card) =>
        card.id === draggingId
          ? {
              ...card,
              position: {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
              },
            }
          : card
      )
    );
  };

  const handleMouseUp = () => {
    setCards((cards) =>
      cards.map((card) =>
        card.id === draggingId ? { ...card, position: card.home } : card
      )
    );

    setDraggingId(null);
  };

  return (
    <div
      className="container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h1>Carta aleatoria</h1>

      <Boton alHacerClic={randomImage} texto="Dame carta" />

      {cards.map((card) => (
        <img
          draggable={false}
          key={card.id}
          src={card.src}
          className="image"
          onMouseDown={(e) => handleMouseDown(e, card.id)}
          style={{
            position: "absolute",
            left: card.position.x,
            top: card.position.y,
            cursor: draggingId === card.id ? "grabbing" : "grab",
          }}
        />
      ))}
    </div>
  );
}

export default App;
