const Btn = (props) => {
  return <button className={`btn ${props.styles}` } onClick={props.handleClick} >{props.text}</button>;
};

export default Btn;
