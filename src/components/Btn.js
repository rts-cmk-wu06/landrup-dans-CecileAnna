const Btn = (props) => {
  return <button className={`btn ${props.styles}`}>{props.text}</button>;
};

export default Btn;
