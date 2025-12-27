import React from "react";
import "./BurnZone.css";

const BurnZone = ({ visible }) => {
  if (!visible) return null;

  return <div className="burn-zone">QUEMAR</div>;
};

export default BurnZone;
