import { useState, useCallback, useEffect } from "react";

// Hook `useDraggable`:
// Proporciona la lógica para arrastrar un elemento con el ratón.
// Parámetros:
// - `id`: identificador de la entidad arrastrada
// - `initialPosition`: posición inicial { x, y } enviada por el padre
// - `onDragEnd`: callback opcional que recibe (id, position) al soltar
// - `onDragStart`: callback opcional que recibe (id) al comenzar el arrastre
export const useDraggable = ({
  id,
  initialPosition,
  onDragEnd,
  onDragStart,
}) => {
  // Estado local para la posición actualmente mostrada en pantalla
  const [position, setPosition] = useState(initialPosition);
  // Indica si la carta está siendo arrastrada
  const [isDragging, setIsDragging] = useState(false);
  // Offset entre la posición del cursor y la posición del elemento
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Si la posición inicial cambia desde el padre (ej. repartir nuevas cartas),
  // sincronizamos la posición local para que la UI refleje el estado del padre.
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  // Al presionar el ratón sobre el elemento
  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      // Notificamos al padre que comienza el arrastre
      if (onDragStart) onDragStart(id);
      // Calculamos el desfase para mantener la posición relativa del cursor
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position, id, onDragStart]
  );

  // Mientras movemos el ratón, actualizamos la posición visual
  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    },
    [isDragging, dragOffset]
  );

  // Al soltar el ratón
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);

      // Informamos al padre de la posición final
      if (onDragEnd) {
        onDragEnd(id, position);
      }

      // Forzamos la posición local a la que nos proporcione el padre
      // Esto evita que la carta quede visualmente en una posición
      // distinta a la que el estado global (padre) conoce.
      setPosition(initialPosition);
    }
  }, [isDragging, onDragEnd, id, initialPosition, position]);

  // Listeners globales para seguir el arrastre aunque el cursor salga del elemento
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Exponemos la posición actual, el estado de arrastre y la función para iniciar
  // el arrastre (que se liga al evento onMouseDown del elemento).
  return {
    position,
    isDragging,
    handleMouseDown,
  };
};
