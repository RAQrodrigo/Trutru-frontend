import React, { useState } from "react";
import { useDraggable } from "../../hooks/useDraggable";
import "./Card.css";

// Componente `Card`: representa una carta individual en la interfaz.
// Props:
// - `card`: objeto con datos de la carta (id, src, position, rotate, ...)
// - `onDragEnd`: callback que se llama cuando termina el arrastre -> recibe (id, position)
// - `onDragStart`: callback opcional cuando comienza el arrastre -> recibe (id)

const Card = ({ card, onDragEnd, onDragStart }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Inicializamos el hook `useDraggable` para proporcionar la lógica de arrastre.
  // Le pasamos el id y la posición inicial; además le delegamos los callbacks
  // `onDragEnd` y `onDragStart` que vienen por props para que el padre los reciba
  // con la información adecuada (incluida la posición final).
  const { position, isDragging, handleMouseDown } = useDraggable({
    id: card.id,
    initialPosition: card.position,
    onDragEnd: onDragEnd ? onDragEnd : undefined,
    onDragStart: onDragStart ? onDragStart : undefined,
  });

  // Estilos en línea para posicionar y animar la carta según su estado
  // make table/burned cards smaller than hand cards
  const imageWidth = card.zone === "table" || card.zone === "burned" ? 80 : 110;

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${imageWidth}px`,
    transform: isDragging
      ? `translate(-50%, -50%) rotate(0deg) scale(1.1)` // durante el arrastre se eleva/escala
      : isHovered
      ? `translate(-50%, -60%) rotate(${card.rotate}deg) scale(1.05)` // elevación al pasar el ratón
      : `translate(-50%, -50%) rotate(${card.rotate}deg) scale(1)`,
    zIndex: isDragging || isHovered ? 100 : 1,
    cursor: isDragging
      ? "grabbing"
      : card.zone === "burned"
      ? "default"
      : "grab",
    transition: isDragging ? "none" : "all 0.25s ease",
    pointerEvents: card.zone === "burned" ? "none" : "auto",
  };

  return (
    <img
      src={card.src}
      className={`card-image ${card.burning ? "burning" : ""} ${
        card.zone === "burned" ? "burned" : ""
      }`}
      draggable={false} // desactivamos el drag nativo del navegador
      onMouseDown={handleMouseDown} // inicia la lógica de arrastre del hook
      onMouseEnter={() => setIsHovered(true)} // estado visual al pasar el ratón
      onMouseLeave={() => setIsHovered(false)}
      style={style}
      alt="Card"
    />
  );
};

export default Card;
