import "./Trains.css";
import React, { useContext, useEffect, useState } from "react";
import FetchTrains from "../FetchTrains/FetchTrains";
import SearchTrains from "../SearchTrains/SearchTrains";
import { MyContext } from "../../Context/Context";
import Loader from "../../Loader/Loader";
import TrainService from "../../../service/TrainService";
import AvailabilityService from "../../../service/AvailabilityService";

const Trains = () => {
  const myContext = useContext(MyContext);

  useEffect(() => {
    myContext.onHomePage(true);
  }, [myContext]);

  const [allTrains, setAllTrains] = useState([]); // Store all trains
  const [trains, setTrains] = useState([]); // Displayed trains
  const [availability, setAvailabilityData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loader, setLoader] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [failed, setFailed] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    source: "",
    destination: "",
    trainClass: "",
    departureDate: "",
  });

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setIsSearchClicked(true); // Only filter results when search is clicked
  };

  const fetchTrains = async () => {
    setLoader(true);
    setFailed(false);
    try {
      const response = await TrainService.getAllTrains();
      const data = response.data;
      setAllTrains(data);

      setTimeout(() => {
        setLoader(false);
      }, 3000);
    } catch (error) {
      setFailed(true);
      console.error("Error fetching trains:", error);
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await AvailabilityService.getAvailabilityByTransportType(
        "TRAIN"
      );
      setAvailabilityData(response.data);
    } catch (error) {
      setFailed(true);
      console.error("Error fetching availability:", error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // **Filtering Logic**
  useEffect(() => {
    if (!isSearchClicked) {
        setTrains(allTrains);
        return; // Don't filter until search is clicked
    } 

    console.log("All Trains Data:", allTrains);
    console.log("All Availability Data:", availability);

    const {
      source = "",
      destination = "",
      trainClass = "",
      departureDate = "",
    } = searchFilters;

    const filteredTrains = allTrains.filter((train) => {
      const trainSource = train.source?.trim().toLowerCase() || "";
      const trainDestination = train.destination?.trim().toLowerCase() || "";
      const trainClassValue = train.trainClass?.trim().toLowerCase() || "";

      const matchesSource =
        source.trim() === "" || trainSource === source.trim().toLowerCase();
      const matchesDestination =
        destination.trim() === "" ||
        trainDestination === destination.trim().toLowerCase();
      const matchesTrainClass =
        trainClass.trim() === "" ||
        trainClassValue === trainClass.trim().toLowerCase();

      let matchesDepartureDate = true;
      const formattedDepartureDate = departureDate?.value ?? "";
      if (formattedDepartureDate !== "") {
        matchesDepartureDate = availability.some(
          (avail) =>
            avail.transportId === train.trainId &&
            avail.travelDate === formattedDepartureDate
        );
      }

      return (
        matchesSource &&
        matchesDestination &&
        matchesTrainClass &&
        matchesDepartureDate
      );
    });

    console.log("Filtered Trains After Processing:", filteredTrains);
    setTrains(filteredTrains);
  }, [searchFilters, allTrains, availability, isSearchClicked]); // Depend on isSearchClicked


  return (
    <div className="trains">
      {loader ? (
        <Loader type="trains" failed={failed} />
      ) : (
        <>
          <SearchTrains onSearch={handleSearch} />
          <div className="trains-tickets-container">
            <h1>Available Trains</h1>
            <div className="trains-tickets">

              {trains.length > 0 ? (
                trains.map((train) => (
                  <FetchTrains
                    key={train.trainId}
                    type="trains"
                    train={train}
                    filters={isSearchClicked ? searchFilters : undefined}
                  />
                ))
              ) : (
                <p>No trains found.</p>
              )}

              {/* {trains.map((train) => (
                <FetchTrains
                  key={train.trainId}
                  type="trains"
                  train={train}
                />
              ))} */}

              {/* <FetchTrains type="trains" filters={searchFilters} trains={trains} /> */}

            </div>
          </div>
        </>
      )}
    </div>
  );

};
export default Trains;
