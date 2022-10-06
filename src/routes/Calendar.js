import CalendarCard from "../components/CalendarCard";
import FooterMenu from "../components/FooterMenu";
import Heading2 from "../components/subcomponents/texts/Heading2";
import WrapperCenterContent from "../components/WrapperCenterContent";

import axios from "../apis/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Heading3 from "../components/subcomponents/texts/Heading3";
import Heading5 from "../components/subcomponents/texts/Heading5";
import LoginIcon from "../components/subcomponents/icons/LoginIcon";

const Calendar = () => {
  const useA = useAuth();
  const auth = useA.auth;

  // console.log(auth);

  const userId = auth.userId;
  const role = auth.role;
  const login = auth.login;
  const token = auth.token;

  const USER_URL = `api/v1/users/${userId}`;
  const ACTIVITIES_URL = "api/v1/activities";

  const [userActivitiesData, setUserActivitiesData] = useState("");
  const [instructorActivitiesData, setInstructorActivitiesData] = useState("");

  useEffect(() => {
    fetchUser();

    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line
  }, [instructorActivitiesData?.length]);

  const fetchUser = async () => {
    try {
      if (userId) {
        const response = await axios.get(USER_URL, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        let userActivities = response?.data?.activities;

        setUserActivitiesData(userActivities);

        console.log(userActivitiesData && userActivitiesData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get(ACTIVITIES_URL);

      let activities = response?.data;

      setInstructorActivitiesData(activities);

      // console.log(instructorActivitiesData && instructorActivitiesData);
    } catch (err) {
      console.log(err);
    }
  };

  let instructorActivitiesArray;

  if (instructorActivitiesData?.length) {
    instructorActivitiesArray = instructorActivitiesData
      ?.map((activity) => {
        const container = {};
        if (auth.userId === activity?.instructorId) {
          container.name = activity?.name;
          container.weekday = activity?.weekday;
          container.time = activity?.time;
          container.users = activity?.users;
          container.activityId = activity?.id;
        }

        return container;
      })
      .filter((activity) => activity.name !== undefined);
  }

  return (
    <>
      <WrapperCenterContent>
        <Heading2 text="Kalender" />

        {userActivitiesData && userId && role && role === "default" && (
          <main className="calender--cards-wrapper">
            {userActivitiesData.map((userActivityData) => (
              <Link
                to={`/activities/${userActivityData.id}`}
                style={{ textDecoration: "none" }}
                key={userActivityData.id}
              >
                <CalendarCard
                  activityTitle={`${userActivityData.name}`}
                  activityDayAndTime={`${userActivityData.weekday} ${userActivityData.time}`}
                />
              </Link>
            ))}
          </main>
        )}

        {instructorActivitiesArray?.length &&
          userId &&
          role &&
          role === "instructor" && (
            <main className="calender--cards-wrapper">
              {instructorActivitiesArray.map((instructorActivity) => (
                <Link
                  to={`/class-overview/${instructorActivity?.activityId}`}
                  style={{ textDecoration: "none" }}
                  key={instructorActivity?.activityId}
                >
                  <CalendarCard
                    activityTitle={`${instructorActivity?.name}`}
                    activityDayAndTime={`${instructorActivity?.weekday} ${instructorActivity?.time}`}
                  />
                </Link>
              ))}
            </main>
          )}

        {!login && (
          <>
            <Heading3
              text="Log ind for at se din kalender"
              styles="light-purple-color-important"
            />
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
          </>
        )}
      </WrapperCenterContent>
      <FooterMenu />
    </>
  );
};

export default Calendar;
