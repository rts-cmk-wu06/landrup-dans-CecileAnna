const WrapperCenterContent = (props) => {
  return (
    <div className={`wrapper-center-content ${props.styles}`}>
      {props.children}
    </div>
  );
};

export default WrapperCenterContent;
