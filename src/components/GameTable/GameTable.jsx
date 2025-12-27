import React from "react";
import { useGame } from "../../hooks/useGame";
import Hand from "../Hand/Hand";
import Button from "../UI/Button";
import "./GameTable.css";
import PlayZone from "../PlayZone/PlayZone";
import BurnZone from "../BurnZone/BurnZone";

const GameTable = () => {
  const { cards, dealCards, handleCardDrop, isDragging, setIsDragging } =
    useGame();

  return (
    <div className="game-table">
      <PlayZone visible={true} />
      <BurnZone visible={true} />
      <div className="top-interface">
        <h1>Truquiño</h1>
        <Button onClick={dealCards} className="btn-repartir">
          Repartir Cartas
        </Button>
      </div>

      <Hand cards={cards} onCardDrop={handleCardDrop} />

      <div className="bottom-interface">
        <Button className="btn-envido" onClick={() => console.log("Envido")}>
          Envido
        </Button>
        <Button className="btn-truco" onClick={() => console.log("Truco")}>
          Truco
        </Button>
        <Button className="btn-mazo" onClick={() => console.log("Mazo")}>
          Mazo
        </Button>
      </div>
    </div>
  );
};

export default GameTable;
