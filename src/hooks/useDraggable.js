import { useState, useCallback, useEffect } from "react";

export const useDraggable = ({
  id,
  initialPosition,
  onDragEnd,
  onDragStart,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Update position if initialPosition changes (e.g. dealing new cards)
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      if (onDragStart) onDragStart(id);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

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

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);

      if (onDragEnd) {
        onDragEnd(id);
      }

      // 👇 FORZAMOS volver a la posición que viene del padre
      setPosition(initialPosition);
    }
  }, [isDragging, onDragEnd, id, initialPosition]);

  // Global event listeners for drag while mouse is down (even outside element)
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

  return {
    position,
    isDragging,
    handleMouseDown,
  };
};
