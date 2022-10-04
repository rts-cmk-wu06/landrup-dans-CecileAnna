const Heading2 = (props) => {
  return (
    <>
      <h2 className={`heading2 ${props.styles}`}>{props.text}</h2>
    </>
  );
};

export default Heading2;
