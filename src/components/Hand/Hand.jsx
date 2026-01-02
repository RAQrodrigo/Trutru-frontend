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
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          // Cuando `Card` termine el arrastre llamamos a `onCardDrop` pasando
          // el id, la posición y las referencias a las zonas necesarias
          onDragEnd={(id, pos) => onCardDrop(id, pos, playZoneRef, burnZoneRef)}
          // Pasamos la función para el inicio del arrastre tal cual
          onDragStart={onDragStart}
        />
      ))}
    </>
  );
};

export default Hand;
