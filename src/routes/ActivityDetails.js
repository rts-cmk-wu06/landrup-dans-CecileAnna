import axios from "../apis/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";

import FooterMenu from "../components/FooterMenu";
import WrapperCenterContent from "../components/WrapperCenterContent";
import Heading3 from "../components/subcomponents/texts/Heading3";
import Paragraf from "../components/subcomponents/texts/Paragraf";
import Btn from "../components/Btn";

const ActivityDetails = () => {
  // const useA = useAuth();
  // const setAuth = useA.setAuth;
  // const auth = useA.auth;

  // console.log(auth);

  const login = true;
  const signedUp = false;

  let { id } = useParams();

  const ACTIVITY_URL = `api/v1/activities/${id}`;

  const [activityData, setActivityData] = useState();

  useEffect(() => {
    fetchActivity();
    // eslint-disable-next-line 
  }, [activityData?.id]);

  const fetchActivity = async () => {
    try {
      const response = await axios.get(ACTIVITY_URL);

      let activity = response?.data;

      setActivityData(activity);

      console.log(activityData && activityData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {activityData?.asset?.url && (
        <>
          <div
            className="activity-details--hero-top"
            style={{
              backgroundImage: `url(${
                activityData?.asset?.url
                  ? activityData?.asset?.url
                  : "https://picsum.photos/200/300"
              })`,
            }}
          >
            {login && (
              <Btn
                text={signedUp ? "Forlad" : "Tilmeld"}
                styles="btn activity-details-btn"
              />
            )}
          </div>
          <WrapperCenterContent styles="activity-details-content-wrapper">
            <Heading3
              text={`${activityData.name}`}
              styles={`white-color-important`}
            />

            <Paragraf
              text={`${activityData.minAge}-${activityData.maxAge} år`}
              styles={`white-color-important`}
            />

            <Paragraf
              text={activityData.description}
              styles="activity-details--description white-color-important"
            />
          </WrapperCenterContent>
        </>
      )}

      <FooterMenu />
    </>
  );
};

export default ActivityDetails;
