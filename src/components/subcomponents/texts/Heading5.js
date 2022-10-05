const Heading5 = (props) => {
  return (
    <>
      <h5 className={`heading5 ${props.styles}`} aria-live={props.ariaLive}>{props.text}</h5>
    </>
  );
};

export default Heading5;
