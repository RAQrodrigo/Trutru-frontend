import React, { useRef } from "react";
import { useGame } from "../../hooks/useGame";
import Hand from "../Hand/Hand";
import Button from "../UI/Button";
import Card from "../Card/Card";
import "./GameTable.css";
import PlayZone from "../PlayZone/PlayZone";
import BurnZone from "../BurnZone/BurnZone";

const GameTable = () => {
  const playZoneRef = useRef(null);
  const burnZoneRef = useRef(null);

  const {
    handCards,
    tableCards,
    dealCards,
    handleCardDrop,
    isDragging,
    setIsDragging,
  } = useGame();

  return (
    <div className="game-table">
      <PlayZone ref={playZoneRef} visible={isDragging} />
      <BurnZone ref={burnZoneRef} visible={isDragging} />

      <div className="game-header">
        <h1 className="game-title">Truquiño</h1>
        <div className="deal-container">
          <Button onClick={dealCards} className="btn-repartir">
            Repartir Cartas
          </Button>
        </div>
      </div>

      {/* Opponent cards (face-down) - tight fan */}
      <div className="opponent-row" aria-hidden>
        {[0, 1, 2].map((i) => (
          <img
            key={`op-${i}`}
            src="/images/Blanca.jpg"
            alt="Carta rival"
            className={`opponent-card opp-${i + 1}`}
          />
        ))}
      </div>

      {tableCards.map((card) => (
        <Card key={card.id} card={card} />
      ))}

      <Hand
        cards={handCards}
        onCardDrop={handleCardDrop}
        onDragStart={() => setIsDragging(true)}
        playZoneRef={playZoneRef}
        burnZoneRef={burnZoneRef}
      />

      <div className="bottom-interface">
        <Button className="btn-envido">Envido</Button>
        <Button className="btn-truco">Truco</Button>
        <Button className="btn-mazo">Mazo</Button>
      </div>
    </div>
  );
};

export default GameTable;
