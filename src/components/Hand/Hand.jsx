// Importamos el componente `Card` que representa visualmente una carta
import Card from "../Card/Card";

// Componente `Hand` (Mano): renderiza la lista de cartas que tiene el jugador.
// Props:
// - `cards`: array de objetos carta con sus datos (id, src, position, rotate...)
// - `onCardDrop`: función que maneja cuándo una carta es soltada (se le pasa id y posición)
// - `onDragStart`: función opcional que se llama cuando comienza a arrastrarse una carta
// - `playZoneRef`, `burnZoneRef`: referencias a zonas de la mesa necesarias para calcular dónde se suelta
const Hand = ({ cards, onCardDrop, onDragStart, playZoneRef, burnZoneRef }) => {
  return (
    <>
      {/* Recorremos las cartas y renderizamos un `Card` por cada una */}
      {cards
        .filter((card) => card.zone === "hand")
        .map((card) => (
          <Card
            key={card.id}
            card={card}
            onDragEnd={(id, pos) =>
              onCardDrop(id, pos, playZoneRef, burnZoneRef)
            }
            onDragStart={onDragStart}
          />
        ))}
    </>
  );
};

export default Hand;
