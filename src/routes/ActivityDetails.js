import axios from "../apis/axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useParams } from "react-router-dom";

import FooterMenu from "../components/FooterMenu";
import WrapperCenterContent from "../components/WrapperCenterContent";
import Heading3 from "../components/subcomponents/texts/Heading3";
import Heading5 from "../components/subcomponents/texts/Heading5";
import Paragraf from "../components/subcomponents/texts/Paragraf";
import Btn from "../components/Btn";
import LoginIcon from "../components/subcomponents/icons/LoginIcon";

const ActivityDetails = () => {
  const useA = useAuth();
  const auth = useA.auth;

  const login = auth.login;

  // console.log(auth);

  const [signedUp, setSignedUp] = useState(false);

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

    const activityUsersArray = activityData?.users?.map((user) => {
      const container = {};
      if (auth?.userId) {
        container.username = user.username;
        container.userId = user.id;
        container.age = user.age;
        container.firstname = user.firstname;
        container.lastname = user.lastname;
        container.acvitityWeekday = activityData?.weekday;
        container.acvitityTime = activityData?.time;

        if (user?.id === auth?.userId) {
          setSignedUp(true);
        }
      }
      return container;
    });

    console.log(activityUsersArray && activityUsersArray);

    // console.log(signedUp);
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
