import "./Buses.css";
import React, { useContext, useEffect, useState } from "react";
import FetchBuses from "../FetchBuses/FetchBuses";
import SearchBuses from "../SearchBuses/SearchBuses";
import { MyContext } from "../../Context/Context";
import Loader from "../../Loader/Loader";
import BusService from "../../../service/BusService";
import AvailabilityService from "../../../service/AvailabilityService";

const Buses = () => {
  const myContext = useContext(MyContext);

  useEffect(() => {
    myContext.onHomePage(true);
  }, [myContext]);

  const [allBuses, setAllBuses] = useState([]); // Store all buses
  const [buses, setBuses] = useState([]); // Displayed buses
  const [availability, setAvailabilityData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loader, setLoader] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [failed, setFailed] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    source: "",
    destination: "",
    busClass: "",
    departureDate: "",
  });

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    setIsSearchClicked(true); // Only filter results when search is clicked
  };

  const fetchBuses = async () => {
    setLoader(true);
    setFailed(false);
    try {
      const response = await BusService.getAllBuses();
      const data = response.data;
      setAllBuses(data);

      setTimeout(() => {
        setLoader(false);
      }, 3000);
    } catch (error) {
      setFailed(true);
      console.error("Error fetching buses:", error);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchAvailability = async () => {
    try {
      const response = await AvailabilityService.getAvailabilityByTransportType(
        "BUS"
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
        setBuses(allBuses);
        return; // Don't filter until search is clicked
    } 

    console.log("All Buses Data:", allBuses);
    console.log("All Availability Data:", availability);

    const {
      source = "",
      destination = "",
      busClass = "",
      departureDate = "",
    } = searchFilters;

    const filteredBuses = allBuses.filter((bus) => {
      const busSource = bus.source?.trim().toLowerCase() || "";
      const busDestination = bus.destination?.trim().toLowerCase() || "";
      const busClassValue = bus.busClass?.trim().toLowerCase() || "";

      const matchesSource =
        source.trim() === "" || busSource === source.trim().toLowerCase();
      const matchesDestination =
        destination.trim() === "" ||
        busDestination === destination.trim().toLowerCase();
      const matchesBusClass =
        busClass.trim() === "" ||
        busClassValue === busClass.trim().toLowerCase();

      let matchesDepartureDate = true;
      const formattedDepartureDate = departureDate?.value ?? "";
      if (formattedDepartureDate !== "") {
        matchesDepartureDate = availability.some(
          (avail) =>
            avail.transportId === bus.busId &&
            avail.travelDate === formattedDepartureDate
        );
      }

      return (
        matchesSource &&
        matchesDestination &&
        matchesBusClass &&
        matchesDepartureDate
      );
    });

    console.log("Filtered Buses After Processing:", filteredBuses);
    setBuses(filteredBuses);
  }, [searchFilters, allBuses, availability, isSearchClicked]); // Depend on isSearchClicked


  return (
    <div className="buses">
      {loader ? (
        <Loader type="buses" failed={failed} />
      ) : (
        <>
          <SearchBuses onSearch={handleSearch} />
          <div className="buses-tickets-container">
            <h1>Available Buses</h1>
            <div className="buses-tickets">

              {buses.length > 0 ? (
                buses.map((bus) => (
                  <FetchBuses
                    key={bus.busId}
                    type="buses"
                    bus={bus}
                    filters={isSearchClicked ? searchFilters : undefined}
                  />
                ))
              ) : (
                <p>No buses found.</p>
              )}

              {/* {buses.map((bus) => (
                <FetchBuses
                  key={bus.busId}
                  type="buses"
                  bus={bus}
                />
              ))} */}

              {/* <FetchBuses type="buses" filters={searchFilters} buses={buses} /> */}

            </div>
          </div>
        </>
      )}
    </div>
  );

};
export default Buses;
