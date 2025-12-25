function Boton({ alHacerClic, texto, claseExtra }) {
  return (
    <button onClick={alHacerClic} className={claseExtra}>
      {texto}
    </button>
  );
}
export default Boton;
