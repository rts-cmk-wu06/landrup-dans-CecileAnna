import FooterMenu from "../components/FooterMenu";
import SearchIcon from "../components/subcomponents/icons/SearchIcon";
import Heading2 from "../components/subcomponents/texts/Heading2";
import WrapperCenterContent from "../components/WrapperCenterContent";
import ActivitiesCard from "../components/ActivitiesCard";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../apis/axios";

const ACTIVITIES_URL = "api/v1/activities";

const Search = () => {
  const [searchData, setSearchData] = useState("");
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
      <WrapperCenterContent styles="search--wrapper">
        <Heading2 text="Søg" />
        <div className="search--input-wrapper">
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setSearchData(e.target.value)}
            value={searchData}
            className="search--input"
          />
          <SearchIcon styles="search--icon" />
        </div>
        {activitiesData[0] && (
          <div className="activities-cards-container search--activities-cards-container">
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

export default Search;
