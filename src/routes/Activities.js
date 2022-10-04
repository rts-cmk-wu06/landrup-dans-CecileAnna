import FooterMenu from "../components/FooterMenu";
import Heading2 from "../components/subcomponents/texts/Heading2";
import WrapperCenterContent from "../components/WrapperCenterContent";
import ActivitiesCard from "../components/ActivitiesCard";
import axios from "../apis/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ACTIVITIES_URL = "api/v1/activities";

const Activities = () => {
  const [activitiesData, setActivitiesData] = useState("");

  useEffect(() => {
    fetchActivities();
  }, [activitiesData?.length]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(ACTIVITIES_URL);

      let activities = response?.data;

      setActivitiesData(activities);

      console.log(activitiesData && activitiesData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <WrapperCenterContent>
        <Heading2 text="Aktiviteter" />

        {activitiesData[0] && (
          <div className="activities-cards-container">
            {activitiesData.map((activityData) => (
              <Link
                to={`/activities/${activityData.id}`}
                style={{ textDecoration: "none" }}
                key={activityData.id}
              >
                <ActivitiesCard
                  cornerBoxTextTop={`${activityData.name}`}
                  cornerBoxTextBottom={`${activityData.minAge}-${activityData.maxAge} år`}
                  bgUrl={`${activityData.asset.url}`}
                />
              </Link>
            ))}
          </div>
        )}
      </WrapperCenterContent>

      <FooterMenu />
    </>
  );
};

export default Activities;
