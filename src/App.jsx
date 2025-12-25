// Importamos el hook useState desde React
import { useState } from "react";

// Importamos estilos
import "./App.css";

// Importamos el componente Boton
import Boton from "./Boton.jsx";

function App() {
  // Lista de imágenes disponibles para las cartas
  const images = [
    "/images/1Basto.jpg",
    "/images/1Espada.jpg",
    "/images/7Espada.jpg",
    //"/images/7Oro.jpg",
  ];

  // Estado que guarda las cartas actualmente en pantalla
  const [cards, setCards] = useState([]);

  // Guarda el id de la carta que se está arrastrando (null si ninguna)
  const [draggingId, setDraggingId] = useState(null);

  // Guarda la diferencia entre el mouse y la esquina de la carta
  // para que no "salte" al arrastrar
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Posiciones "hogar" de las cartas (formato abanico)
  const homePositions = [
    { x: 500, y: 450, rotate: -15 },
    { x: 650, y: 430, rotate: 0 },
    { x: 800, y: 450, rotate: 15 },
  ];

  // Función que reparte las cartas
  const Dar_cartas = () => {
    // Evita volver a repartir si ya hay cartas
    if (cards.length > 0) return;

    // Creamos una carta por cada posición del abanico
    const nuevasCartas = homePositions.map((home) => {
      // Elegimos una imagen al azar
      const index = Math.floor(Math.random() * images.length);

      return {
        id: Date.now() + Math.random(), // id único
        src: images[index], // imagen de la carta
        position: { x: home.x, y: home.y }, // posición actual
        home: { x: home.x, y: home.y }, // posición a la que vuelve
        rotate: home.rotate, // rotación fija
      };
    });

    // Guardamos las cartas en el estado
    setCards(nuevasCartas);
  };

  // Cuando apretamos el mouse sobre una carta
  const handleMouseDown = (e, id) => {
    e.preventDefault(); // evita el drag nativo del navegador

    // Buscamos la carta clickeada
    const card = cards.find((c) => c.id === id);

    // Indicamos que esta carta se está arrastrando
    setDraggingId(id);

    // Calculamos el offset entre mouse y carta
    setOffset({
      x: e.clientX - card.position.x,
      y: e.clientY - card.position.y,
    });
  };

  // Mientras movemos el mouse
  const handleMouseMove = (e) => {
    if (!draggingId) return;

    // Actualizamos solo la carta que se está moviendo
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

  // Cuando soltamos el mouse
  const handleMouseUp = () => {
    // Hacemos que la carta vuelva a su posición "hogar"
    setCards((cards) =>
      cards.map((card) =>
        card.id === draggingId ? { ...card, position: card.home } : card
      )
    );

    // Dejamos de arrastrar
    setDraggingId(null);
  };

  return (
    // El contenedor escucha el movimiento y soltado del mouse
    <div
      className="container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h1>Truquiño</h1>

      {/* Botón que reparte las cartas */}
      <Boton alHacerClic={Dar_cartas} texto="Jugar" />

      {/* Renderizamos todas las cartas */}
      {cards.map((card) => (
        <img
          draggable={false} // desactiva drag del navegador
          key={card.id}
          src={card.src}
          className="image"
          onMouseDown={(e) => handleMouseDown(e, card.id)}
          style={{
            position: "absolute",
            left: card.position.x,
            top: card.position.y,
            transform: `rotate(${card.rotate}deg)`,
            transition: draggingId === card.id ? "none" : "0.3s",
            cursor: draggingId === card.id ? "grabbing" : "grab",
          }}
        />
      ))}
    </div>
  );
}

export default App;
