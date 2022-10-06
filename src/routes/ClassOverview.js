import FooterMenu from "../components/FooterMenu";
import Heading2 from "../components/subcomponents/texts/Heading2";
import Paragraf from "../components/subcomponents/texts/Paragraf";
import WrapperCenterContent from "../components/WrapperCenterContent";

import { useParams } from "react-router-dom";
import axios from "../apis/axios";
import { useState, useEffect } from "react";

const ClassOverview = () => {
  let { id } = useParams();

  const ACTIVITY_URL = `api/v1/activities/${id}`;

  const [activityData, setActivityData] = useState();

  useEffect(() => {
    fetchActivity();
    // eslint-disable-next-line
  }, [id, activityData?.length]);

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
      <WrapperCenterContent>

              {activityData?.name && (
              
                <>
                  <Heading2 text={activityData.name} />

                  <section className="class-overview--participants-wrapper">
                    {activityData.users.map((user) => (
                      <Paragraf
                        text={`${user.firstname} ${user.lastname}`}
                        key={user.id}
                        styles="white-color-important"
                      />
                    ))}
                  </section>
                </>

                )}
              
          
      </WrapperCenterContent>
  
      <FooterMenu />
    </>
  );
};

export default ClassOverview;
