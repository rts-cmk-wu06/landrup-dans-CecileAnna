import Heading5 from "../components/subcomponents/texts/Heading5";

const ActivitiesCard = (props) => {
  return (
    <>
      <div
        className={`activities-card ${props.cardStyles}`}
        style={{ backgroundImage: `url(${props.bgUrl})` }}
      >
        <div
          className={`activities-card--corner-box
            ${props.cornerBoxStyles}`}
        >
          <Heading5
            text={props.cornerBoxTextTop}
            styles={`${props.cardTextStyles}`}
          />
          <Heading5
            text={props.cornerBoxTextBottom}
            styles={`${props.cardTextStyles}`}
          />
        </div>
      </div>
    </>
  );
};

export default ActivitiesCard;
