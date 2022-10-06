import Heading2 from "./subcomponents/texts/Heading2";
import Heading5 from "./subcomponents/texts/Heading5";


const CalendarCard = (props) => {


  return (
    <>
      <div className="calendar--card">
        <Heading2
          text={props.activityTitle}
          styles={`black-color-important calendar--title ${props.titleStyles}`}
        />
        <Heading5
          text={props.activityDayAndTime}
          styles={`black-color-important ${props.dayAndTimeStyles}`}
        />
      </div>
    </>
  );
};

export default CalendarCard;
