const Paragraf = (props) => {
  return (
    <>
      <p className={`paragraf ${props.styles}`}>{props.text}</p>
    </>
  );
};

export default Paragraf;
