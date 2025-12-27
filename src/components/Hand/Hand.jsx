import React from "react";
import Card from "../Card/Card";

const Hand = ({ cards, onCardDrop, onDragStart }) => {
  return (
    <>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragEnd={onCardDrop}
          onDragStart={onDragStart}
        />
      ))}
    </>
  );
};

export default Hand;
