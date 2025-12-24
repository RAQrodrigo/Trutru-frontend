// Boton.jsx
function Boton({ texto, alHacerClic }) {
  return (
    <button 
      className="mi-boton-personalizado" 
      onClick={alHacerClic}
    >
      {texto}
    </button>
  );
}

export default Boton;