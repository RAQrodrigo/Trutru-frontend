import React, { forwardRef } from "react";
import "./BurnZone.css";

const BurnZone = forwardRef(({ visible }, ref) => {
  if (!visible) return null;

  return (
    <div ref={ref} className="burn-zone">
      QUEMAR
    </div>
  );
});

export default BurnZone;
