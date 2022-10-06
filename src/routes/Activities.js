import FooterMenu from "../components/FooterMenu";
import Heading2 from "../components/subcomponents/texts/Heading2";
import WrapperCenterContent from "../components/WrapperCenterContent";
import ActivitiesCard from "../components/ActivitiesCard";
import LoginIcon from "../components/subcomponents/icons/LoginIcon";
import Heading5 from "../components/subcomponents/texts/Heading5";

import axios from "../apis/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";



const ACTIVITIES_URL = "api/v1/activities";

const Activities = () => {
  const useA = useAuth();
  const auth = useA.auth;

  // console.log(auth);

  const login = auth.login;

  const [activitiesData, setActivitiesData] = useState("");

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line
  }, [activitiesData?.length]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(ACTIVITIES_URL);

      let activities = response?.data;

      setActivitiesData(activities);

      // console.log(activitiesData && activitiesData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <WrapperCenterContent>
        <div className="activities--heading-wrapper">
          <Heading2 text="Aktiviteter" />
          {!login && (
            <Link
              to={`/login`}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Heading5 text="Log in" styles="white-color-important" />
              <LoginIcon />
            </Link>
          )}
        </div>

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
