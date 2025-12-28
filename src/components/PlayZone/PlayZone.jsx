import React from "react";
import "./PlayZone.css";

const PlayZone = ({ visible }) => {
  if (!visible) return null;

  return <div className="play-zone">JUGAR</div>;
};

export default PlayZone;
