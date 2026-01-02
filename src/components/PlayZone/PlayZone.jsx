import React, { forwardRef } from "react";
import "./PlayZone.css";

const PlayZone = forwardRef(({ visible }, ref) => {
  if (!visible) return null;

  return (
    <div ref={ref} className="play-zone">
      JUGAR
    </div>
  );
});

export default PlayZone;
